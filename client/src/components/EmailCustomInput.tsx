import { HiMail } from "react-icons/hi";
import { Label,TextInput } from "flowbite-react";

type Props = {
    value:string
    onChange: (e:any) => void
}

export default function EmailCustomInput(props:Props) {
    return (
        <div>
            <Label value="Email" />
            <TextInput
                required
                type="email"
                inputMode='email'
                placeholder="Email"
                aria-required="true"
                autoComplete="email"
                value={props.value}
                onChange={(e) => props.onChange(e)}
                icon={() => <HiMail color={props.value.includes("@") && props.value.length > 4 ? "orange" : ""} />}
            />
        </div>
    )
}