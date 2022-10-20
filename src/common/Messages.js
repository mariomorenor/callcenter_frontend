import { ToastProgrammatic as Toast } from "buefy";

const SUCCESS = ({
  message = "Operación realizada Correctamente",
  type = "is-info",
  duration = 2000,
  position = "is-bottom",
} = {}) => {
  Toast.open({
    message,
    type,
    duration,
    position,
  });
};

const SERVER_ERROR = ({
  message = "Ocurrió un problema en el Servidor",
  type = "is-danger",
  duration = 3000,
  position = "is-bottom",
  queue = true,
} = {}) => {
  Toast.open({
    message,
    type,
    duration,
    position,
    queue,
  });
};

const INVALID_TOKEN = ({
  message = "El token de acceso no es válido, favor vuelva a iniciar sesión",
  type = "is-danger",
  duration = 3000,
  position = "is-bottom",
} = {}) => {
  Toast.open({
    message,
    type,
    duration,
    position,
  });
};

const NO_TOKEN = ({
  message = "No existe token de acceso",
  type = "is-danger",
  duration = 3000,
  position = "is-bottom",
} = {}) => {
  Toast.open({
    message,
    type,
    duration,
    position,
  });
};

export { SUCCESS, INVALID_TOKEN, SERVER_ERROR, NO_TOKEN };
