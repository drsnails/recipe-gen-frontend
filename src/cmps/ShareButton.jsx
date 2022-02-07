import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    TelegramIcon,
    WorkplaceShareButton
} from "react-share";


const DynamicShareBtn = (props) => {
    switch (props.type) {
        case 'whatsapp':
            return <WhatsappShareButton {...props}><WhatsappIcon /></WhatsappShareButton>;

        case 'facebook':
            return <FacebookShareButton {...props}><FacebookIcon /></FacebookShareButton>;
        case 'telegram':
            return <TelegramShareButton {...props}><TelegramIcon/></TelegramShareButton>;

        default:
            break;
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
