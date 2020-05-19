import React, { useState } from 'react';
import {Modal, Input} from 'antd';
import uid from 'uid';

const CandidateModal = ({setExamCandidates,active,setActive,candidate,setCandidate})=>{
    const [value,setValue] = useState(candidate)

    return<Modal
    visible={active}
    onCancel={()=>setActive(false)}
    onOk ={()=>
        {
            setValue(null)
            setExamCandidates({email:value,otp:uid(5)});
            setCandidate(null)
            setActive(false);
        }
    }
    title = {"Add New Candidate"}
    >
        <Input type="email" value={value} onChange={(e)=>setValue(e.target.value)}/>

    </Modal>
}

export default CandidateModal;