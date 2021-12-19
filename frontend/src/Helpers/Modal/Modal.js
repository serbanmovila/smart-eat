import { Modal } from '@material-ui/core'

export default function MyModal(props) {
    return (
        <Modal
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClose={props.close}
            open={props.open}
        >
            <>{props.children}</>
        </Modal>
    )
}
