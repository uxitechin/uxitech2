"use client";

import React from "react";
import { LiquidMetalButton, LiquidMetalButtonProps } from "./LiquidMetalButton";

export type ButtonProps = LiquidMetalButtonProps;

export default function Button(props: ButtonProps) {
  return <LiquidMetalButton {...props} />;
}

export { LiquidMetalButton };
