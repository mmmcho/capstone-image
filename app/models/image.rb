class Image < ActiveRecord::Base
  include Protectable
  attr_accessor :image_content, :signup

  has_many :thing_images, inverse_of: :image, dependent: :destroy
  has_many :things, through: :thing_images

  scope :without_users, -> { where.not(id: User.with_images.pluck(:image_id).uniq) }

  def basename
    caption || "image-#{id}"
  end
end
