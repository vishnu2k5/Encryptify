const reportWebVitals = async (onPerfEntry) => {
  
  if (typeof onPerfEntry !== 'function') return;

  try {
   
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

 
    const metrics = [getCLS, getFID, getFCP, getLCP, getTTFB];

    metrics.forEach((metric) => metric(onPerfEntry));
  } catch (error) {
    
    console.error("Error loading web-vitals:", error);
  }
};

export default reportWebVitals;
