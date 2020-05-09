import React from 'react';
import {Modal, Input} from 'antd';
import uid from 'uid';

const CandidateModal = ({setExamCandidates,active,setActive,candidate,setCandidate})=>(
    <Modal
    visible={active}
    onCancel={()=>setActive(false)}
    onOk ={()=>
        {
            setExamCandidates({email:candidate,otp:uid(5)});
            setCandidate(null)
            setActive(false);
        }
    }
    title = {"Add New Candidate"}
    >
        <Input type="email" value={candidate} onChange={(e)=>setCandidate(e.target.value)}/>

    </Modal>
)

export default CandidateModal;