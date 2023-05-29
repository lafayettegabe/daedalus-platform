import React, { useState, useRef } from "react";
import Image from "next/image";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { auth } from "../../Firebase";
import { useRouter } from "next/navigation";

interface IProfileProps {
  User: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    phoneNumber: string | null;
  } | null;
}

export const Profile: React.FC<IProfileProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //logout
  const logout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const isTriggerOrContent = triggerRef.current?.contains(event.target as Node) || contentRef.current?.contains(event.target as Node);
    if (!isTriggerOrContent) {
      setIsOpen(false);
    }
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <div
          className="flex flex-row items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={triggerRef}
        >
          <h2 className="text-lg font-normal text-zinc-300">
            {props.User?.displayName || "Guest"}
          </h2>
          <Image
            src={props.User?.photoURL || "https://lh3.googleusercontent.com/a/AAcHTtdvDzsonOKvdYrssf-CEy-GGGQU-zGQlt4KT-3t=s96-c"}
            alt="profile picture"
            width={40}
            height={40}
            className="rounded-full ml-2"
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropdownMenuContent"
          sideOffset={5}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          
        >

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
              <div className="LeftSlot">
                <ChevronLeftIcon />
              </div>
              <div className="RightSlot">
                More Tools  
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="DropdownMenuSubContent"
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className="DropdownMenuItem">
                  NOT
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">
                  IMPLEMENTED
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">
                  YET
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item className="DropdownMenuItem">
                  PLEASE WAIT
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Item className="DropdownMenuItem" disabled>
            <div className="RightSlot">Services</div>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="DropdownMenuItem"
            onSelect={() => logout()}
          >
            <div className="RightSlot font-bold">Logout</div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
