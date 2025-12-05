"use client";

import { setFirstVisit } from "@/utils/localStorage";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useEffect } from "react";

const OpenningModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const raw = localStorage.getItem("userData");
    const data = raw ? JSON.parse(raw) : [];
    if (!data.noFirstVisit) {
      onOpen();
      setFirstVisit();
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-3xl">
              <h1>Что из себя представляет проект</h1>
            </ModalHeader>
            <ModalBody>
              <div className="border-b-2 border-default-300 pb-2">
                <p className="text-lg">
                  Rate this Game - проект который позволит любителяи видеоигр,
                  подойти более обдуманно к той или иной игре после ее
                  прохождения. Оценить отдельно каждый ее аспект и понять
                  сильные и слабые стороны.
                </p>
              </div>
              <div>
                <p>
                  Я люблю играть в игры. А еще я люблю обдумывать и оценивать
                  любой контент, будь то фильм, игра или музыка. Изначальное
                  вдохновение было взято от проекта 'РЗТ', крупное музыкальное
                  сообщество, основанное на идеи осмысления и оценивания музыки.
                  Цель проекта создать нeчто подобное для сферы игр, оссобенно
                  учитывая что хорошая игра - куда более крупный и разноплановый
                  проект чем музыка или даже фильмы. Не найдя ничего подобного в
                  инетернете я решил сделать свою альтернативу. Проект еще в
                  разработке, много чего надо и будет сделано.
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" variant="light" onPress={onClose}>
                Понял
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OpenningModal;
