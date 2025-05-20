import {useContext} from 'react'
import ChatContext from '../../context/ChatContext'
export default function BoardList() {
    const {boards} = useContext(ChatContext)

  return (
    <section>
        {
        boards 
        ? <div>
            {boards.map}
        </div>
            : null
    }
    </section>
  )
}
