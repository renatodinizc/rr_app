class Dog < ApplicationRecord
    has_one_attached :image

    def image_path
        # ActiveStorage::Blob.service.path_for(image.key)
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end
end
