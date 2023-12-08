const yearDate =(fechaRecibida) => {
    const fecha = new Date(fechaRecibida+'T00:00:00');

    return fecha.getFullYear();

}
export default yearDate