Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  resources :users, only: [:create, :show]
  post '/articles', to: 'articles#create'
  get '/articles', to: 'articles#index'
  delete '/articles', to: 'articles#destroy'
  
  resources :articles
end
