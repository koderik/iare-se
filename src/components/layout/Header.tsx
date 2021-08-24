import { Box, BoxProps, Flex, HStack } from "@chakra-ui/layout";
import AccessibleLink from "components/AccessibleLink";
import {
    Button,
    chakra,
    Icon,
    Spacer,
    useDisclosure,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LinkComponent } from "components/LinkComponent";
import { MdChatBubble } from "react-icons/md";
import { LanguageMenu } from "./header/LanguageMenu";
import { IoCloseCircle } from "react-icons/io5";
import { MobileMenuItem } from "./header/MobileMenuItem";
import { Logo } from "./header/Logo";
import { Section } from "./header/Section";
import { useRecoilValue } from "recoil";
import { headerState } from "state/layout";
import { Feedback } from "./header/Feedback";

const Header = (props: BoxProps) => {
    const { languages, contact, sections } = useRecoilValue(headerState);
    const { onClose, onOpen, isOpen } = useDisclosure();

    const { scrollY } = useViewportScroll();
    const [y, setY] = useState(0);

    const ref = useRef<HTMLHeadingElement>(null);
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

    useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()));
    }, [scrollY]);

    const contactVariants = useBreakpointValue({
        base: "",
        lg: contact.label,
    });

    const currentLanguage = useMemo(
        () => languages.find((l) => l.code === "se"),
        [languages]
    );

    return (
        <React.Fragment>
            <chakra.header
                ref={ref}
                py={4}
                bg="white"
                position="sticky"
                transition="box-shadow 0.3s"
                w="full"
                maxH={16}
                zIndex={11}
                top={0}
                left={0}
                right={0}
                shadow={y > height ? "base" : undefined}
                {...props}
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto"
                >
                    <AccessibleLink href="/">
                        <Logo priority />
                    </AccessibleLink>
                    <Box display={{ base: "none", md: "inline-flex" }} ml={10}>
                        <HStack spacing={1}>
                            {sections.map((section) => (
                                <Section
                                    key={"section" + section.id}
                                    {...section}
                                />
                            ))}
                        </HStack>
                    </Box>
                    <Spacer />
                    <Flex alignItems="center">
                        <HStack spacing={2}>
                            <Feedback />
                            <LanguageMenu
                                standardLanguage={currentLanguage}
                                languages={languages}
                                size="sm"
                                display={{ base: "none", md: "flex" }}
                            />
                            <LinkComponent
                                as={Button}
                                size="sm"
                                href={contact.href}
                                display={{ base: "none", md: "flex" }}
                            >
                                <Icon
                                    as={MdChatBubble}
                                    mr={{ base: 0, lg: 2 }}
                                />
                                {contactVariants}
                            </LinkComponent>
                            <IconButton
                                size="sm"
                                display={{ base: "flex", md: "none" }}
                                aria-label="Menu"
                                icon={<AiOutlineMenu />}
                                variant="ghost"
                                fontSize="xl"
                                onClick={onOpen}
                            />
                        </HStack>
                    </Flex>
                </Flex>
            </chakra.header>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="right"
                size="sm"
                closeOnEsc
                closeOnOverlayClick
                blockScrollOnMount
                autoFocus={false}
            >
                <DrawerOverlay />

                <DrawerContent>
                    <Flex w="full" justify="flex-end" px={3} pt={4}>
                        <IconButton
                            aria-label="Menu"
                            icon={<IoCloseCircle />}
                            variant="ghost"
                            fontSize="xl"
                            onClick={onClose}
                        />
                    </Flex>
                    <DrawerBody>
                        <Flex
                            direction="column"
                            justify="space-between"
                            h="full"
                        >
                            {sections?.map((section) => (
                                <MobileMenuItem
                                    key={section.id}
                                    section={section}
                                    onClose={onClose}
                                />
                            ))}
                            <Spacer />
                            <Flex direction="column">
                                <LanguageMenu
                                    standardLanguage={currentLanguage}
                                    languages={languages}
                                    isMobile
                                />

                                <LinkComponent
                                    href={contact.href}
                                    as={Button}
                                    mt={2}
                                    variant="iareSolid"
                                    leftIcon={<MdChatBubble />}
                                    isFullWidth
                                >
                                    {contact.label}
                                </LinkComponent>
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
};

export default Header;
