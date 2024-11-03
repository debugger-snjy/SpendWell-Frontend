function CategoryDeleteModal(props) {

    return (
        <div className="modal fade" id={`deleteConfirmationModal${props.itemNo}`} tabIndex="-1" aria-labelledby={`deleteConfirmationModalLabel${props.itemNo}`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`deleteConfirmationModalLabel${props.itemNo}`}>Delete '<strong>{props.categoryName}</strong>' Category ?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            console.log("Demoooo. ... ")
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Delete Category</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CategoryDeleteModal