class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :headline, null: false
      t.text :snippet, null: false
      t.string :image, default: 'n/a'
      t.string :link, null: false
      t.string :publisher, null: false
      t.timestamps
    end
  end
end
