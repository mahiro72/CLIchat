import React, {FC} from "react";
import Image from "next/image";

export const Header: FC = () => {
    return(
        <Image
            src="/layouts/2022.png"
            alt="2022"
            width={338}
            height={125}
        />
    )
}
