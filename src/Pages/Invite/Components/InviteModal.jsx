import React from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    EmailShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    LinkedinIcon,
    WhatsappIcon,
    TwitterIcon
} from "react-share";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineContentCopy } from 'react-icons/md';

const InviteModal = ({ modal, setModal, setState, inviteURL, state }) => {
    return (
        <div className={`${modal ? 'fixed' : 'hidden'} z-50 top-0 left-0 bg-black bg-opacity-70 w-full h-screen  flex items-center justify-center`}>
            <div className='bg-white w-11/12 sm:w-fit rounded-lg text-black p-5 relative'>
                <p onClick={() => { setModal(false); setState({ ...state, copied: false }) }} className='absolute top-0 right-0 m-3 mr-4 cursor-pointer font-bold'>✕</p>
                <h3>Invite friends</h3>
                <ul className='flex gap-6 py-5 w-fit mx-auto sm:px-20'>
                    <FacebookShareButton url={inviteURL}>
                        <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>
                    <EmailShareButton url={inviteURL}>
                        <EmailIcon size={40} round={true} />
                    </EmailShareButton>
                    <LinkedinShareButton url={inviteURL}>
                        <LinkedinIcon size={40} round={true} />
                    </LinkedinShareButton>
                    <TwitterShareButton url={inviteURL}>
                        <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={inviteURL}>
                        <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>
                </ul>
                <div className='flex items-center relative'>
                    <input type='text' className='w-full p-3 border border-purple-700 hover:outline-purple-700 rounded bg-gray-100' value={state.value} onChange={({ target: { value } }) => setState({ value, copied: false })} />
                    <CopyToClipboard text={state.value}
                        onCopy={() => setState({ copied: true })}>
                        <span className='absolute right-2 cursor-copy'><MdOutlineContentCopy className='w-7 h-7 text-gray-800' /></span>
                    </CopyToClipboard>
                    {state.copied ? <span className='absolute right-0 -top-10 bg-green-500 text-white py-1 px-2 rounded'>Copied</span> : null}
                </div>
            </div>
        </div>
    );
};

export default InviteModal;