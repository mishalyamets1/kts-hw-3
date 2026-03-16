export type Locale = 'en' | 'ru';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'ru'];

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    'header.nav.products': 'Products',
    'header.nav.categories': 'Categories',
    'header.nav.about': 'About us',
    'header.theme.light': 'Light',
    'header.theme.dark': 'Dark',
    'header.theme.toggle': 'Toggle color theme',
    'header.theme.toLight': 'Switch to light theme',
    'header.theme.toDark': 'Switch to dark theme',
    'header.language': 'Language',
    'header.account': 'Account',

    'auth.title.login': 'Login',
    'auth.title.register': 'Register',
    'auth.subtitle.login': 'Sign in to continue',
    'auth.subtitle.register': 'Create an account to start shopping',
    'auth.field.username': 'Username',
    'auth.field.email': 'Email',
    'auth.field.password': 'Password',
    'auth.submit.loading': 'Loading...',
    'auth.switch.toLogin': 'I already have an account',
    'auth.switch.toRegister': 'Create an account',

    'profile.title': 'Profile',
    'profile.subtitle': 'Manage your account details',
    'profile.field.email': 'Email',
    'profile.field.username': 'Username',
    'profile.logout': 'Logout',
    'profile.defaultUser': 'User',
    'profile.defaultEmail': 'Not set',

    'about.title': 'About us',
    'about.intro.main':
      'My name is Mikhail Lyamets, I am a junior frontend developer. This project was created as part of the KTS course "Junior React Developer".',
    'about.intro.stack': 'The project uses React, TypeScript, MobX, Next.js and SCSS.',
    'about.highlight.stack.title': 'Modern stack',
    'about.highlight.stack.description':
      'React, TypeScript, Next.js and MobX help build fast, stable and scalable interfaces.',
    'about.highlight.details.title': 'Attention to detail',
    'about.highlight.details.description':
      'Thoughtful typography, loading states, animation and responsiveness on all popular devices.',
    'about.highlight.practice.title': 'Practical approach',
    'about.highlight.practice.description':
      'Each screen is built as a real product task: from idea to working user scenario.',
    'about.story.title': 'About the project',
    'about.story.text':
      'For me, this is not just a study work but a full step toward product development. I focus on clean component architecture, clear data structure and convenient user experience. The goal of this page is to show not only technologies but also my approach to interface quality.',
    'about.stats.tech': 'key technologies',
    'about.stats.adaptive': 'responsive interface',
    'about.stats.goal': 'goal: make it convenient',

    'hero.title': 'Products',
    'hero.description':
      'We display products based on the latest products we have, if you want to see our old products please enter the name of the item',

    'menu.searchPlaceholder': 'Search product',
    'menu.findNow': 'Find now',
    'menu.filter': 'Filter',
    'menu.reset': 'Reset',
    'menu.totalProducts': 'Total products',

    'products.empty.title': 'Nothing was found',
    'products.empty.subtitle': 'Try changing the query or resetting the filters',
    'products.inCart': 'In the cart:',
    'products.addToCart': 'Add to Cart',
    'products.scrollToTop': 'Scroll to top',
    'products.backToTop': 'Back to top',

    'categories.title': 'Categories',

    'cart.title': 'Cart',
    'cart.productsInCart': 'Products in the cart:',
    'cart.total': 'Total:',
    'cart.buyAll': 'Buy all',
    'cart.remove': 'Remove',
    'cart.buy': 'Buy',
    'cart.empty': 'Cart is empty',
    'cart.continueShopping': 'Continue Shopping',

    'checkout.title': 'Checkout',
    'checkout.yourOrder': 'Your order',
    'checkout.noItems': 'No items to checkout',
    'checkout.quantity': 'Quantity:',
    'checkout.total': 'Total:',
    'checkout.paymentDetails': 'Payment details',
    'checkout.fullName': 'Full name',
    'checkout.fullNamePlaceholder': 'Ivan Ivanov',
    'checkout.shippingAddress': 'Shipping address',
    'checkout.shippingAddressPlaceholder': '123 Primernaya ul, Moscow',
    'checkout.cardNumber': 'Card number',
    'checkout.cardNumberPlaceholder': '1234 5678 9012 3456',
    'checkout.expiry': 'Expiry',
    'checkout.cvv': 'CVV',
    'checkout.processing': 'Processing...',
    'checkout.pay': 'Pay',

    'single.imageAlt': 'product photo',
    'single.buyNow': 'Buy now',
    'single.addToCart': 'Add to cart',
    'single.inCart': 'In the cart:',
    'single.related': 'Related Items',

    'backButton.alt': 'back arrow',
    'backButton.text': 'Back',

    'toast.quantityInCart': 'Quantity in the cart:',

    'error.title': 'Something went wrong',
    'error.tryAgain': 'Try again',
    'error.home': 'Home',

    'notFound.message': 'Page not found',
    'notFound.home': 'Home',

    'success.title': 'Order confirmed!',
    'success.message': 'Thank you for your purchase. We will process your order shortly.',
    'success.back': 'Back to shopping',
  },
  ru: {
    'header.nav.products': 'Товары',
    'header.nav.categories': 'Категории',
    'header.nav.about': 'О нас',
    'header.theme.light': 'Светлая',
    'header.theme.dark': 'Тёмная',
    'header.theme.toggle': 'Переключить тему',
    'header.theme.toLight': 'Переключить на светлую тему',
    'header.theme.toDark': 'Переключить на тёмную тему',
    'header.language': 'Язык',
    'header.account': 'Аккаунт',

    'auth.title.login': 'Вход',
    'auth.title.register': 'Регистрация',
    'auth.subtitle.login': 'Войдите в аккаунт, чтобы продолжить',
    'auth.subtitle.register': 'Создайте аккаунт для покупок',
    'auth.field.username': 'Имя пользователя',
    'auth.field.email': 'Email',
    'auth.field.password': 'Пароль',
    'auth.submit.loading': 'Загрузка...',
    'auth.switch.toLogin': 'У меня уже есть аккаунт',
    'auth.switch.toRegister': 'Создать аккаунт',

    'profile.title': 'Профиль',
    'profile.subtitle': 'Управление данными аккаунта',
    'profile.field.email': 'Email',
    'profile.field.username': 'Имя пользователя',
    'profile.logout': 'Выйти',
    'profile.defaultUser': 'Пользователь',
    'profile.defaultEmail': 'Не указано',

    'about.title': 'О нас',
    'about.intro.main':
      'Меня зовут Лямец Михаил, я начинающий фронтенд-разработчик. Этот проект был разработан в рамках курса «Начинающий React-разработчик» от KTS.',
    'about.intro.stack': 'В работе использованы React, TypeScript, MobX, Next.js и SCSS.',
    'about.highlight.stack.title': 'Современный стек',
    'about.highlight.stack.description':
      'React, TypeScript, Next.js и MobX позволяют делать быстрые, стабильные и масштабируемые интерфейсы.',
    'about.highlight.details.title': 'Внимание к деталям',
    'about.highlight.details.description':
      'Продуманная типографика, состояния загрузки, анимации и отзывчивость на всех популярных устройствах.',
    'about.highlight.practice.title': 'Практический подход',
    'about.highlight.practice.description':
      'Каждый экран создается как реальная продуктовая задача: от идеи до рабочего пользовательского сценария.',
    'about.story.title': 'О проекте',
    'about.story.text':
      'Для меня это не просто учебная работа, а полноценный шаг в продуктовую разработку. Я делаю акцент на чистой архитектуре компонентов, понятной структуре данных и удобном пользовательском опыте. Цель этой страницы показать не только технологии, но и отношение к качеству интерфейса.',
    'about.stats.tech': 'ключевых технологий',
    'about.stats.adaptive': 'адаптивный интерфейс',
    'about.stats.goal': 'цель: сделать удобно',

    'hero.title': 'Товары',
    'hero.description':
      'Мы показываем актуальные товары. Если хотите найти конкретную позицию, введите название в поиск.',

    'menu.searchPlaceholder': 'Поиск товара',
    'menu.findNow': 'Найти',
    'menu.filter': 'Фильтр',
    'menu.reset': 'Сбросить',
    'menu.totalProducts': 'Всего товаров',

    'products.empty.title': 'Ничего не найдено',
    'products.empty.subtitle': 'Попробуйте изменить запрос или сбросить фильтры',
    'products.inCart': 'В корзине:',
    'products.addToCart': 'В корзину',
    'products.scrollToTop': 'Прокрутить вверх',
    'products.backToTop': 'Наверх',

    'categories.title': 'Категории',

    'cart.title': 'Корзина',
    'cart.productsInCart': 'Товаров в корзине:',
    'cart.total': 'Итого:',
    'cart.buyAll': 'Купить все',
    'cart.remove': 'Удалить',
    'cart.buy': 'Купить',
    'cart.empty': 'Корзина пуста',
    'cart.continueShopping': 'Продолжить покупки',

    'checkout.title': 'Оформление заказа',
    'checkout.yourOrder': 'Ваш заказ',
    'checkout.noItems': 'Нет товаров для оформления',
    'checkout.quantity': 'Количество:',
    'checkout.total': 'Итого:',
    'checkout.paymentDetails': 'Платежные данные',
    'checkout.fullName': 'Полное имя',
    'checkout.fullNamePlaceholder': 'Иван Иванов',
    'checkout.shippingAddress': 'Адрес доставки',
    'checkout.shippingAddressPlaceholder': 'ул. Примерная 123, Москва',
    'checkout.cardNumber': 'Номер карты',
    'checkout.cardNumberPlaceholder': '1234 5678 9012 3456',
    'checkout.expiry': 'Срок',
    'checkout.cvv': 'CVV',
    'checkout.processing': 'Обработка...',
    'checkout.pay': 'Оплатить',

    'single.imageAlt': 'фото товара',
    'single.buyNow': 'Купить сейчас',
    'single.addToCart': 'В корзину',
    'single.inCart': 'В корзине:',
    'single.related': 'Похожие товары',

    'backButton.alt': 'стрелка назад',
    'backButton.text': 'Назад',

    'toast.quantityInCart': 'Количество в корзине:',

    'error.title': 'Что-то пошло не так',
    'error.tryAgain': 'Попробовать снова',
    'error.home': 'На главную',

    'notFound.message': 'Страница не найдена',
    'notFound.home': 'На главную',

    'success.title': 'Заказ подтвержден!',
    'success.message': 'Спасибо за покупку. Мы скоро обработаем ваш заказ.',
    'success.back': 'Вернуться к покупкам',
  },
};
