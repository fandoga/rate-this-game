import { Button } from "@heroui/button";
import { RatedGameType } from "@/types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useAppDispatch, useAppSelector } from "@/utils/hooksRedux";
import { useLazyGetGameByIdQuery } from "@/store/services/rawgApi";
import { useEffect } from "react";
import { Skeleton } from "@heroui/skeleton";
import RatingSpan from "./RatingSpan";
import { rateSlice } from "@/store/reducers/rateSlice";

interface RatedGameModalProps {
  sel_game: RatedGameType;
  isOpen: boolean;
  onOpenChange: any;
}

const RatedGameModal: React.FC<RatedGameModalProps> = ({
  sel_game,
  isOpen,
  onOpenChange,
}) => {
  const dispatch = useAppDispatch();
  const { setGame } = rateSlice.actions;
  const [fetchGameById, { data, isFetching }] = useLazyGetGameByIdQuery();

  useEffect(() => {
    fetchGameById(sel_game.id);
  }, [sel_game]);

  const game = data;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <Skeleton isLoaded={!isFetching}>
            <ModalHeader className="flex flex-col gap-1 text-3xl">
              {game?.name}
            </ModalHeader>
            <ModalBody>
              <div>
                <img
                  className="mb-6 rounded-lg"
                  src={game?.background_image}
                  alt={game?.name}
                />
                <p>{game?.description_raw.slice(0, 600) + "..."}</p>
              </div>
              <div className="flex justify-center">
                <RatingSpan game={sel_game} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </Skeleton>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RatedGameModal;
