import React, { useState, useEffect } from 'react'

interface OptionType {
  label: string;
  value: string;
}

interface DefaultValueOptions {
  options: OptionType[];
}

interface ArrayProps {
  defaultValue?: string | DefaultValueOptions;
  onChange?: (data: any) => void;
}

export default function Array(props: ArrayProps): React.ReactElement {
  const {
    defaultValue
  } = props

  const [nowValue, setNowValue] = useState<OptionType[]>([])

  if (defaultValue) {
    if (typeof defaultValue === 'object' && defaultValue.options) {
      setNowValue((defaultValue as DefaultValueOptions).options)
    }
  }

  function Add(label: string, value: string): void {
    // setNowValue([])
    let newValue = [...nowValue]
    let AddValue: OptionType = {
      "label": label,
      "value": value
    }
    newValue.push(AddValue)
    setNowValue(newValue)
    console.log(AddValue)
    console.log(nowValue)
  }

  useEffect(() => {
    setTimeout(() => {
      let value = {
        options: nowValue
      }
      document.addEventListener("change", value as any)
    }, 0)
  }, [nowValue])


  return <div>
    {nowValue.length > 1 ? nowValue.map((item: OptionType, i: number) =>
      <div key={i}>{item.value}{i}</div>
    ) : <></>}
    <div onClick={() => Add("label", "value")}>+</div>
  </div>
}
