import { Label, TextInput } from "flowbite-react";
import { RiLockPasswordLine } from "react-icons/ri";

type Props = {
    value:any
    title:string
    iconColor:string
    helperText?:string
    confirmInputCondition?:boolean
    onBlur?: () => void
    onChange: (e:any) => void
}

export default function PasswordCustomInput(props:Props) {
    return (
        <div>
            <Label
                value={props.title} 
                style={{textTransform:'capitalize'}}
            />
            <TextInput
                required
                type='password'
                id={props.title}
                value={props.value}
                aria-required="true"
                onBlur={props.onBlur}
                autoComplete='password'
                placeholder={props.title}
                onChange={(e) => props.onChange(e)}
                aria-describedby="password-requirements"
                icon={() => <RiLockPasswordLine color={props.iconColor} />}
                helperText={props.confirmInputCondition && (<div className="font-medium text-red-500">{props.helperText ?? ''}</div>)}
            />
        </div>
    )
}