import { DialogProgrammatic as Dialog } from "buefy";

const DESTROY = ({
  title = "¿Seguro de Eliminar?",
  message = "Esta acción no se puede deshacer!",
  type = "is-danger",
  onConfirm,
} = {}) => {
  Dialog.confirm({
    title,
    message,
    type,
    onConfirm,
  });
};

export { DESTROY };
