import { RootState } from "@/store";
import { hideModal, showModal } from "@/store/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const useModal = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const setShowModal = (modal: string) => {
    dispatch(showModal(modal));
  };

  const setHideModal = () => {
    dispatch(hideModal());
  };

  return {
    modalState,
    setShowModal,
    setHideModal,
  };
};

export default useModal;
