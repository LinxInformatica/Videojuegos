const orderFunction=(videogames,criterios)=>{
    //function de criterios
    const ordenamiento = (a, b) => {
        for (const criterio of criterios) {
          const { field, order } = criterio;
          const valorA = a[field];
          const valorB = b[field];
      
          if (order === 'A') {
            if (valorA < valorB) return -1;
            if (valorA > valorB) return 1;
          } else if (order === 'D') {
            if (valorA > valorB) return -1;
            if (valorA < valorB) return 1;
          }
        }
        return 0;
      };
    
    return videogames.sort(ordenamiento)
}
export default orderFunction