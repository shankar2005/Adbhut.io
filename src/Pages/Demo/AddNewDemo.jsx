import { useState } from 'react';
import { BiLink } from 'react-icons/bi';
import { CgAddR } from 'react-icons/cg';
import { MdUpload } from 'react-icons/md';
import Badge from '../../Components/Badge/Badge';
import Modal from '../../Components/Modal/Modal';
import AddDemoUrl from './Components/AddDemoUrl';
import UploadDemoFile from './Components/UploadDemoFile';

const AddNewDemo = () => {
    const [showAddNewDemo, setShowAddNewDemo] = useState(null);
    const [demoSec, setDemoSec] = useState(null);

    let DemoSec;
    if (demoSec === "fileDemo") {
        DemoSec = <UploadDemoFile setDemoSec={setDemoSec} />
    } else if (demoSec === "linkDemo") {
        DemoSec = <AddDemoUrl setDemoSec={setDemoSec} />
    }

    return (
        <section className="font-normal">
            <Badge onClick={() => setShowAddNewDemo(!showAddNewDemo)} type="gray" className="inline-flex gap-1 items-center justify-between cursor-pointer">
                Add New Demo <CgAddR size={20} />
            </Badge>

            {
                showAddNewDemo &&
                <Modal onClick={() => {
                    setShowAddNewDemo(false)
                    setDemoSec(null)
                }}
                    className="w-11/12 max-w-2xl"
                >
                    <div className="bg-white px-4 py-8 relative border-b mb-4 space-x-1">
                        <Badge onClick={() => setDemoSec("fileDemo")} type="gray" className="inline-flex items-center justify-between cursor-pointer">
                            Upload file <MdUpload size={20} />
                        </Badge>
                        <Badge onClick={() => setDemoSec("linkDemo")} type="gray" className="inline-flex gap-1 items-center justify-between cursor-pointer">
                            Add link <BiLink size={20} />
                        </Badge>

                        {DemoSec}
                    </div>
                </Modal>
            }
        </section>
    );
};

export default AddNewDemo;