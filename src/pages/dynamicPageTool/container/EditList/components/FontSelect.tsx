import React, { useState, useEffect } from 'react'
import './index.less'
import { ArrowBottomSvg, ArrowTopSvg } from './public/svg'

interface OptionType {
  value: string;
  text?: string;
}

interface FontSelectProps {
  options?: OptionType[];
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
}

export default function FontSelect(props: FontSelectProps): React.ReactElement {
  const {
    options,
    value,
    onChange
  } = props
  const [selectKey, setSelectKey] = useState<number>(0)
  const [hidden, setHidden] = useState<boolean>(true)
  const [defaultValue, setDefaultValue] = useState<OptionType>({ "value": "10" })

  useEffect(() => {
    if (Array.isArray(options) && options.length > 1) {
      options.map((item: OptionType, i: number) => {
        if (item.value == value) {
          setSelectKey(i)
          setDefaultValue(item)
        }
        console.log(item.value, value)
      })
    }
  }, [value, options])

  function handleChange(select: OptionType, clicked: number): void {
    setSelectKey(clicked)
    setDefaultValue(select)
    setHidden(false)
    let change = {
      target: {
        value: select.value
      }
    }
    console.log(change, clicked)
    onChange?.(change)
  }

  let textStyle = (item: OptionType): React.CSSProperties => {
    return {
      fontSize: item.value + "px"
    }
  }

  let SelectStyle: React.CSSProperties = {
    fontSize: defaultValue.value + "px"
  }

  const handleShow = (): void => {
    setHidden(!hidden)
  }

  return <>
    <div className="FontSelect_content" onClick={handleShow}>
      <span className="FontSelect_labelText">已选择：</span>
      <span className="FontSelect_text" style={SelectStyle}>{defaultValue.text || "文字展示"}</span>
      {/* <span className="FontSelect_value">{item.value+"px"}</span> */}
      <span className="FontSelect_selectbox">{hidden ? <ArrowTopSvg /> : <ArrowBottomSvg />}</span>
    </div>
    {Array.isArray(options) && options.length > 1 ? options.map((item: OptionType, i: number) => <div className="FontSelect_content" style={{ display: hidden ? "none" : "flex" }} key={i} onClick={() => handleChange(item, i)}>
      <span className="FontSelect_text" style={textStyle(item)}>{item.text || "文字展示"}</span>
      {/* <span className="FontSelect_value">{item.value+"px"}</span> */}
      <span className={+selectKey === i ? "FontSelect_selectbox selected" : "FontSelect_selectbox"}></span>
    </div>) : null}
  </>
}
