'use client'

import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';

interface UserFormProps {
  address: string;
}

const Chart: React.FC<UserFormProps> = ({ address }) => {
  const chartRef = useRef<ApexCharts | null>(null);

  useEffect(() => {
    async function fetchData(address: string) {
      try {
       const url = 'https://geocode.maps.co/search?q=' + address;
    // Realiza la primera solicitud para obtener las coordenadas
    const response = await axios.get(url);
    const data = response.data[0];
    let latitude = data.lat;
    let longitude = data.lon;
    let coordinates = { latitude, longitude };


    // Realiza la segunda solicitud utilizando las coordenadas
    const response_geoIdV4 = await axios.get('https://api.gateway.attomdata.com/v4/area/hierarchy/lookup?WKTString=POINT(' + coordinates.longitude + '%20' + coordinates.latitude + ')', {
      headers: { 'apikey': '35947c28f092d454cb0c5708e1a12112' },
      proxy: undefined
    });

    // Accede al cuerpo de la respuesta
    //console.log(JSON.stringify(response_geoIdV4.data, null, 2));
    let itemWithCommunityDataAvailable1;
    for (const key in response_geoIdV4.data.response.result.package.item) {
      const currentItem = response_geoIdV4.data.response.result.package.item[key];
      if (currentItem.community_data_available === "1") {
        itemWithCommunityDataAvailable1 = currentItem;
        break;
      }
    }

    let geoIdV4;
    if (itemWithCommunityDataAvailable1) {
      // Accede a la propiedad geoIdV4 del objeto encontrado
      geoIdV4 = itemWithCommunityDataAvailable1.geoIdV4;
    }
    const options = {
    method: 'GET',
    url: 'https://api.gateway.attomdata.com/v4/transaction/salestrend?geoIdV4='+geoIdV4+'&interval=monthly&startyear=2019&endyear=2022',
    headers: {'apikey': '35947c28f092d454cb0c5708e1a12112'}
  };


    const response_final = await axios.request(options);

    //console.log(JSON.stringify(response_final.data, null, 2));

    const extractedData = response_final.data.salesTrends.map((sale: any) => {
    return {
        start: sale.dateRange.start,
        avgSalePrice: sale.salesTrend.avgSalePrice
    };
    });
    return extractedData;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }

    async function fetchDataAndCreateChart(address: string) {
      try {
        const data = await fetchData(address);
        createChart(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    function createChart(data: any[]) {
      // Extraer fechas y precios promedio de los datos
      const dates = data.map(entry => entry.start);
      const avgSalePrices = data.map(entry => entry.avgSalePrice);

      // Crear una nueva instancia de ApexCharts
      const chartOptions: ApexCharts.ApexOptions = {
        chart: {
          type: 'line',
          height: 350,
        },
        series: [{
          name: 'Average Sale Price',
          data: avgSalePrices,
        }],
        xaxis: {
          categories: dates,
        },
      };

      // Si el gráfico ya existe, actualiza los datos
      if (chartRef.current) {
        chartRef.current.updateOptions(chartOptions);
      } else {
        // Si el gráfico no existe, crea uno nuevo
        const newChart = new ApexCharts(document.querySelector("#chart"), chartOptions);
        chartRef.current = newChart;
        newChart.render();
      }
    }

    // Llamar a la función asíncrona para obtener datos y crear o actualizar el gráfico
    fetchDataAndCreateChart(address);

    // Limpieza al desmontar el componente
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [address]);

  return (
    <div id="chart">
      
    </div>
  );
};

export default Chart;
