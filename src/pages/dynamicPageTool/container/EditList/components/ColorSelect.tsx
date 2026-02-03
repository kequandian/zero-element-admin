import React, { useState, useEffect } from 'react'
import "./index.less"
import { ArrowBottomSvg, ArrowTopSvg } from './public/svg'

interface OptionType {
  label: string;
  value: string;
}

interface ColorSelectProps {
  options?: OptionType[];
  value?: string;
  blockStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  onChange?: (e: { target: { value: string } }) => void;
}

export default function ColorSelect(props: ColorSelectProps): React.ReactElement {
  const {
    options,
    value,
    blockStyle = {},
    textStyle = {},
    onChange
  } = props
  const [selectKey, setSelectKey] = useState<number>(0)
  const [hidden, setHidden] = useState<boolean>(true)
  const [defaultValue, setDefaultValue] = useState<OptionType>({ "label": "黑色", "value": "#000" })

  // 判断初始化传值选中
  useEffect(() => {
    if (Array.isArray(options) && options.length > 1) {
      options.map((item: OptionType, i: number) => {
        if (item.value === value) {
          setSelectKey(i)
          setDefaultValue(item)
        }
      })
    }
  }, [value, options])

  // 改变时
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

  let BlockStyle = (item: OptionType): React.CSSProperties => {
    return {
      background: item.value,
      ...blockStyle
    }
  }

  let SelectStyle: React.CSSProperties = {
    background: defaultValue.value,
    ...blockStyle
  }

  let TextStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "bolder",
    flex: 1,
    ...textStyle
  }

  const handleShow = (): void => {
    setHidden(!hidden)
  }

  return (<>
    <div className="ColorSelect_content" onClick={handleShow}>
      已选择：
        <span className="ColorSelect_block" style={SelectStyle}></span>
      <span className="ColorSelect_text" style={TextStyle}>{defaultValue.label}</span>
      <span className="ColorSelect_selectbox">{hidden ? <ArrowTopSvg /> : <ArrowBottomSvg />}</span>
    </div>
    {Array.isArray(options) && options.length > 1 ? options.map((item: OptionType, i: number) => <div className="ColorSelect_content" style={{ display: hidden ? "none" : "flex" }} key={i} onClick={() => handleChange(item, i)}>
      <span className="ColorSelect_block" style={BlockStyle(item)}></span>
      <span className="ColorSelect_text" style={TextStyle}>{item.label}</span>
      <span className={selectKey === i ? "ColorSelect_selectbox selected" : "ColorSelect_selectbox"}></span>
    </div>) : null}
  </>)
}
