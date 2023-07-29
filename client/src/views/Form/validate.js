export const validate = (form) => {
  const error = {};
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (form.name.length < 1) error.name = "Debe ingresar un nombre";
  else error.name = "";

  if (form.description.length < 5)
    error.description = "Debe agregar una descripción válida";
  else error.description = "";

  if (!urlRegex.test(form.image))
    error.image = "Debe agregar una dirección válida";
  else error.image = "";

  if (form.platforms.length < 1)
    error.platforms = "Debe seleccionar al menos una plataforma";
  else error.platforms = "";

  if (form.released.length < 1) error.released = "Debe ingresar una fecha";
  else error.released = "";

  if (form.rating.length < 1) error.rating = "Debe ingresar un número";
  else {
    if (isNaN(form.rating)) error.rating = "Debe ingresar un número válido";
    else error.rating = "";
    if (form.rating < 0) error.rating = "Debe ingresar un número mayor a 0";
    else if (form.rating > 10)
      error.rating = "Debe ingresar un número menor a 10";
    else error.rating = "";
  }

  if (form.genre.length < 1) error.genre = "Debe seleccionar al menos 1 género";
  else error.genre = "";

  console.log(error);

  return error;
};
