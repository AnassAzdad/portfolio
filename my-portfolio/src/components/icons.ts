import { createElement, ReactElement } from "react";
import * as Fi from "react-icons/fi";
import type { IconBaseProps, IconType } from "react-icons";

// react-icons geeft ReactNode terug, wat TypeScript 4.9 met React 19-types niet als JSX accepteert.
const wrap =
  (Icon: IconType) =>
  (props: IconBaseProps): ReactElement =>
    createElement(Icon as unknown as (p: IconBaseProps) => ReactElement, props);

export const FiArrowLeft = wrap(Fi.FiArrowLeft);
export const FiArrowRight = wrap(Fi.FiArrowRight);
export const FiArrowUp = wrap(Fi.FiArrowUp);
export const FiArrowUpRight = wrap(Fi.FiArrowUpRight);
export const FiCheck = wrap(Fi.FiCheck);
export const FiChevronLeft = wrap(Fi.FiChevronLeft);
export const FiChevronRight = wrap(Fi.FiChevronRight);
export const FiDownload = wrap(Fi.FiDownload);
export const FiGithub = wrap(Fi.FiGithub);
export const FiMapPin = wrap(Fi.FiMapPin);
export const FiMenu = wrap(Fi.FiMenu);
export const FiMoon = wrap(Fi.FiMoon);
export const FiRepeat = wrap(Fi.FiRepeat);
export const FiRotateCcw = wrap(Fi.FiRotateCcw);
export const FiSearch = wrap(Fi.FiSearch);
export const FiSun = wrap(Fi.FiSun);
export const FiX = wrap(Fi.FiX);
