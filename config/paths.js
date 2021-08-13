import { IconContext } from 'react-icons/lib';
import { AiFillHome } from 'react-icons/ai';
import { RiBookFill } from 'react-icons/ri';
import { BsCodeSlash } from 'react-icons/bs';

export function StyleIcon({ icon, style }) {
    return (
        <IconContext.Provider value={style} >
            {icon}
        </IconContext.Provider>
    );
}

export default {
    "/": {
        name: "Home",
        icon: <AiFillHome />,
    },
    "/dev": {
        name: "Dev Diaries",
        icon: <RiBookFill />,
    },
    "/projects": {
        name: "Projects",
        icon: <BsCodeSlash />,
        subPaths: {
            "/projects/keyspot": {
                name: "KeySpot",
          }
        }
    },
}