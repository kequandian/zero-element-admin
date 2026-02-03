import { Button, Modal } from "antd";
import React, { useState } from 'react'
import { ComponentSvg } from "../svg";

interface ShowModalProps {
  title?: string;
  titleLabel?: string;
  field?: string;
  fieldLabel?: string;
  icon?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  type?: "button" | "card";
  background?: string;
  initShow?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  children?: React.ReactNode;
}

function hide(): void {
  // Placeholder function
}

export default function ShowModal(props: ShowModalProps): React.ReactElement {
  const {
    title,
    titleLabel,
    field,
    fieldLabel,
    icon,
    width,
    height,
    type = "button",
    background = "#1B7FBC",
    initShow,
    onSuccess = hide,
    onError = hide
  } = props
  const [visabled, setVisabled] = useState<boolean>(initShow || false)

  const changeVisabled = (): void => {
    setVisabled(!visabled)
  }

  function handleHide(): void {
    setVisabled(false)
  }

  function handleSuccess(): void {
    handleHide()
    onSuccess()
  }

  function handleError(): void {
    handleHide()
    onError()
  }

  return <>
    {type === "button" && icon ? <div className="Dynamic_button" onClick={changeVisabled} style={{ background: background, boxShadow: "0px 0px 5px #aaa", color: "white", fontWeight: "bolder", fontSize: "14px", marginRight: "20px" }}>
      <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", marginTop: "3px" }}>{icon}</span>
    </div> : type === "card" ? <div className="Modal_list" onClick={changeVisabled}>
      <p><span style={{ fontWeight: "bolder", marginRight: "10px", marginLeft: "10px" }}>{title}</span></p>
      {/* <p><span style={{fontWeight:"bolder",marginRight:"10px"}}>{fieldLabel}:</span>{field}</p> */}
    </div> : null}
    <Modal width={width} height={height} visible={visabled} onOk={handleSuccess} onCancel={handleError}>
      {props.children}
    </Modal>
  </>
}
