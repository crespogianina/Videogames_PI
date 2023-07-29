import Form from "./views/Form/Form";
function modificar({ game }) {
  return (
    <>
      <Form></Form>
      <label>Nombre: </label>
      <input />
      <label>Imagen: </label>
      <input />
      <div>
        <h2>ID: {game.id}</h2>
        <label> Descripción: </label>
        <input />
        <label>Rating: </label>
        <input />
        <label>Año de lanzamiento:</label>
        <input />
        <label></label>
      </div>
    </>
  );
}
