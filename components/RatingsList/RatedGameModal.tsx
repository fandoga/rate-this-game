"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/skeleton";

import RatingSpan from "./RatingSpan";

import { useLazyGetGameByIdQuery } from "@/store/services/rawgApi";
import { RatedGameDBType } from "@/app/shared/types";
import MobileTooltip from "@/app/shared/components/MobileTooltip";
import clsx from "clsx";
import { Trash } from "@/app/shared/utils/icons";
import { useGameRatings } from "@/app/shared/hooks/useGameRatings";

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
  const { removeRating } = useGameRatings();
  const [confirming, setConfirming] = useState(false);

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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="max-w-80 overflow-hidden"
      classNames={{ wrapper: "flex items-center justify-center" }}
    >
      <ModalContent
        className="items-center justify-center"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {(onClose) => (
          <Skeleton isLoaded={!isFetching}>
            <ModalHeader className="text-3xl">{game?.name}</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  alt={game?.name}
                  className="mb-6 rounded-lg bg-gray-900"
                  src={game?.background_image}
                />
                <p>{game?.description_raw.slice(0, 200) + "..."}</p>
                <div className="flex items-center gap-4">
                  <div className="text-shadow-lg text-shadow-blue-600/20 text-blue-500 font-semibold">
                    <MobileTooltip
                      content="Общ. впечатления"
                      className="text-blue-500"
                      spanClass="mt-4 text-3xl inline-flex w-6 justify-center cursor-default transition-all hover:scale-120"
                      data={sel_game.sub}
                    />
                  </div>
                  <RatingSpan mode="big" game={sel_game} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center justify-between gap-2">
              {!confirming ? (
                <Button
                  className={clsx(
                    "w-6 h-6 opacity-80 transition-all bg-transparent hover:scale-105 hover:opacity-100",
                  )}
                  size="sm"
                  type="button"
                  onPress={() => setConfirming(true)}
                >
                  <Trash />
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    color="danger"
                    size="sm"
                    type="button"
                    onPress={() => {
                      removeRating(sel_game?.gameId);
                      setConfirming(false);
                      onClose();
                    }}
                  >
                    Удалить
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    type="button"
                    onPress={() => setConfirming(false)}
                  >
                    Отмена
                  </Button>
                </div>
              )}
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
