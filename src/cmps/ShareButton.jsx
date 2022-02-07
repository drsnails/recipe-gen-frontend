import {
    EmailShareButton,
    FacebookShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    TelegramIcon,
    EmailIcon,
} from "react-share";


const DynamicShareBtn = (props) => {
    switch (props.type) {
        case 'whatsapp':
            return <WhatsappShareButton {...props}><WhatsappIcon /></WhatsappShareButton>;
        case 'facebook':
            return <FacebookShareButton {...props}><FacebookIcon /></FacebookShareButton>;
        case 'telegram':
            return <TelegramShareButton {...props}><TelegramIcon/></TelegramShareButton>;
        case 'email':
            return <EmailShareButton {...props}><EmailIcon/></EmailShareButton>;
        default:
            return <></>;
    }
}

export function ShareButton(props) {
    return (
        <section className='share-btn'>
            {/* <WhatsappShareButton url=" " title="My Recipe"  ><WhatsappIcon /></WhatsappShareButton> */}
            <DynamicShareBtn {...props} />
        </section>
    );
}
