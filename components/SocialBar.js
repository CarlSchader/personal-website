import { SocialIcon } from 'react-social-icons';

const style = { 
    marginRight: ".5rem",
    marginLeft: ".5rem",
 };

export default function SocialBar() {
    return (
        <>
            <SocialIcon style={style} url="https://github.com/CarlSchader" />
            <SocialIcon style={style} url="https://www.instagram.com/carlschader/" />
            <SocialIcon style={style} url="https://www.youtube.com/channel/UCkTVGwjXYJpx30fumEdNNbA" />
            <SocialIcon style={style} url="https://www.facebook.com/carl.schader.5/" />
        </>
    );
}