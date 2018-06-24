class DocumentoOficial < ApplicationRecord
  belongs_to :user
  has_many :documentos, as: :documentable
end
