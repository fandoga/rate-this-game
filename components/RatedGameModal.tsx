import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect } from "react";
import { Skeleton } from "@heroui/skeleton";

import RatingSpan from "./RatingSpan";

import { useLazyGetGameByIdQuery } from "@/store/services/rawgApi";
import { RatedGameDBType } from "@/app/shared/types";

interface RatedGameModalProps {
  sel_game: RatedGameDBType;
  isOpen: boolean;
  onOpenChange: any;
}

const RatedGameModal: React.FC<RatedGameModalProps> = ({
  sel_game,
  isOpen,
  onOpenChange,
}) => {
  const [fetchGameById, { data, isFetching }] = useLazyGetGameByIdQuery();

  useEffect(() => {
    if (isOpen) {
      const rawgGameId = Number(sel_game.gameId);

      if (!Number.isFinite(rawgGameId)) return;

      fetchGameById(rawgGameId);
    }
    return;
  }, [sel_game.gameId, fetchGameById, isOpen]);

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
                  alt={game?.name}
                  className="mb-6 rounded-lg"
                  src={game?.background_image}
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
