import React,{useState,useEffect} from 'react'
import { mapData } from 'calls/data'
import { ResponsiveChoropleth } from '@nivo/geo'
import { fetchGeography } from 'calls';

const Geography = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const CustomTooltip = ({ feature }) => {
        return (
          <div style={{ backgroundColor: 'white', padding: '10px' ,color:"black" }}>
            {feature && feature.properties && feature.properties.name && (
              <strong>{feature.properties.name}</strong>
            )}
            {feature && feature.value && <p>Value: {feature.value}</p>}
          </div>
        );
      };
    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const fetchedData = await fetchGeography();
            setData(fetchedData);
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, []);
    return (
  <div style={{width:"100%"}}>
        <h1 style={{color:"var(--var3)"}}>Welcome to Geography Map</h1>
        <h3 style={{color:"var(--var3)"}}>Here You can See Where the most users are located arround the world</h3>
        {data&&(<div style={{ height: '500px' }}>
            <ResponsiveChoropleth
        data={data}
            borderWidth={1.2}
            borderColor="#ffffff"
        features={mapData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[ 0, 30 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        tooltip={
                    CustomTooltip
        }
        graticuleLineColor="#dddddd"
        
        
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: 'var(--var3)',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
            
        </div>) }
    </div>
  )
}

export default Geography