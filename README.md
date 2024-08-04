# Wallet Management App

Bu proje, Rise In ve Patika.dev programlarının Frontend & Backend Devs Challenge kapsamında geliştirilmiştir. Wallet Management App, kullanıcıların çeşitli blockchain cüzdanlarını yönetmelerine olanak tanıyan bir uygulamadır. Uygulama, Circle API’si kullanılarak cüzdan bakiyelerini görüntüleme ve fonlama işlemleri gerçekleştirmektedir.

![alt text](/screenshot.png)

## Proje Hakkında

Wallet Management App, aşağıdaki ana özellikleri sunar:

•	Cüzdan Seçimi ve Yönetimi: Kullanıcılar mevcut cüzdanlar arasında seçim yapabilir ve aktif cüzdanları yönetebilirler. <br>
•	Cüzdan Detayları: Seçilen cüzdanın blockchain türü, adresi ve bakiyeleri detaylı bir şekilde görüntülenir. <br>
•	Fonlama İşlemi: Circle API’si kullanılarak cüzdanlara fon eklenebilir. Bu işlem, kullanıcıların belirli cüzdanlarını fonlayarak test etmelerine olanak sağlar.

Bu uygulama, Circle API ile etkileşim kurarak blockchain tabanlı cüzdan yönetimini basit ve kullanıcı dostu bir arayüz ile sunmayı hedefler. Hem frontend hem de backend bileşenlerinden oluşan bu proje, modern web teknolojileri ve API entegrasyonları konusunda pratik yapmanıza yardımcı olabilir.

## Kurulum

Bu projeyi yerel geliştirme ortamında çalıştırmak için aşağıdaki adımları takip edin:

### 1.	Depoyu Klonlayın
### 2. 	Bağımlılıkları Yükleyin
Proje dizininde aşağıdaki komutları çalıştırarak hem frontend hem de backend bağımlılıklarını yükleyin:
```
// Eğer bilgisayarınızda yarn kurulu değilse:
npm install yarn
yarn install
```
### 3.	Çevresel Değişkenleri Ayarlayın
Proje kök dizininde bir .env dosyası oluşturun ve Circle API anahtarınızı ekleyin:
```
REACT_APP_CIRCLE_API_KEY=your_circle_api_key
```
Ayrıca, backend dizininde bir .env dosyası oluşturmanız gerekebilir ve gerekli ortam değişkenlerini burada tanımlamalısınız.

###	4. Frontend Uygulamayı Başlatın
Frontend uygulamasını başlatmak için kök dizinde aşağıdaki komutu çalıştırın:
```
npm start
//proje local server üzerinde çalıştığı için eğer ssl kaynaklı bir hata alırsanız aşağıdaki komut ile başlatın:
NODE_OPTIONS=--openssl-legacy-provider yarn start
```
Uygulama, http://localhost:3000 adresinde çalışacaktır.

### 5. Backend Sunucusunu Başlatın
Backend sunucusunu çalıştırmak için backend dizininde aşağıdaki komutu çalıştırın:
```
cd backend
node server.js
```
Backend sunucusu varsayılan olarak http://localhost:5000 adresinde çalışacaktır.

## Kullanım

•	1. "Create Or Acquire" tuşu ile Circle API bağlantısı sayesinde kendiniz için bir kullanıcı oluşturun.<br>
•	2. "APP ID Retrieved successfully" Mesajını aldıktan sonra "Initialize Now" Tuşu ile oturumunuzu başlatın.<br>
•	3. "User initialized successfully." Mesajını aldıktan sonra "Verify Challenge" Tuşu ile ekranda çıkan Circle formlarını doldurun.<br>
•	4. Kurulum tamamlandıktan sonra "My Wallet" Tuşu ile ekranın sol tarafındaki Cüzdan listesinden bir cüzdan seçin. Seçilen cüzdanın detayları ve bakiyeleri sağdaki panelde görüntülenecektir.<br> 
•	5. Cüzdan Detayları: Seçilen cüzdanın blockchain türü, adresi ve mevcut bakiyeleri detaylar panelinde gösterilir.<br>
•	6. Fonlama: Bir cüzdanın yanında bulunan “Fund Me” butonuna tıklayarak o cüzdana fon ekleyebilirsiniz. Bu işlem, Circle API’si aracılığıyla yapılır.<br><br>

Daha fazla bilgi ve dökümantasyon için Circle blockchain sitesini ziyaret edebilirsiniz:<br>
•	https://learn.circle.com/ 

## Lisans

Bu proje GNU Genel Kamu Lisansı (GPL) v3 altında lisanslanmıştır. Daha fazla bilgi için [GPL v3 lisans belgesini](https://www.gnu.org/licenses/gpl-3.0.html) inceleyebilirsiniz.
