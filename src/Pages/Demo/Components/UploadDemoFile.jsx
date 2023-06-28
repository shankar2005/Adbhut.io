import FileUpload from './FileUpload';

const UploadDemoFile = ({ setDemoSec }) => {
    return (
        <div className="px-4 py-8">
            <h4 className='font-semibold text-lg'>Upload a demo</h4>
            <small>The demo can be a <strong>Video, Audio</strong> file. Uploaded demo will be shown in the ready to use demo section. Production manager can easily assign those ready to use demo in any project.</small>
            <div className="mt-10">
                <FileUpload setDemoSec={setDemoSec} />
            </div>
        </div>
    );
};

export default UploadDemoFile;