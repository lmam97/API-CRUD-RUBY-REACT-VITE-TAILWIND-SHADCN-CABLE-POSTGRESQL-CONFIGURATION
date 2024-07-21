class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :autor
      t.string :price

      t.timestamps
    end
  end
end
