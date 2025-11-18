import React from 'react'
import { useProducts } from '../../../../../../hooks/useProduct'
import { useAppDispatch } from '../../../../../../stores/hook'
import { closeModal } from '../../../../../../stores/reducers/modal/modal.slice'
import { TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteConfirmationProps {
  productId: string
  productName?: string
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ 
  productId, 
  productName 
}) => {
  const { isDeleting, removeProduct } = useProducts()
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    try {
      await removeProduct(productId)
      dispatch(closeModal())
      toast.success('product deleted succesfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete product')
    }
  }

  const handleCancel = () => {
    dispatch(closeModal())
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Warning Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-error/20 text-error rounded-full flex items-center justify-center">
         <TriangleAlert />
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-base-content mb-2">
          Delete Product
        </h3>
        <p className="text-base-content/50">
          Are you sure you want to delete 
          {productName ? (
            <span className="font-semibold text-error"> "{productName}"</span>
          ) : (
            ' this product'
          )}? 
          This action cannot be undone.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleCancel}
          disabled={isDeleting}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn btn-error disabled:bg-error/30 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Deleting...
            </>
          ) : (
            'Delete Product'
          )}
        </button>
      </div>
      <div className="mt-4 p-3 bg-warning/10 rounded-lg">
        <div className="flex items-start gap-2">
         <TriangleAlert className='text-warning' />
          <p className="text-xs text-warning">
            This will permanently remove the product from your inventory and any associated data.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation