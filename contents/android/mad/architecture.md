# Architecture - MAD Skills

`Android Developers` 채널의 `Architecture - MAD Skills` 에피소드를 번역한 게시물입니다. 번역을 진행하면서 의역이 있을 수 있습니다. 만약 잘못된 번역이 있다면 댓글로 알려주시기 바랍니다.

###### 목차

1. [소개 (Introduce)](#소개-introduce)
2. [데이터 영역 (Data Layer)](#데이터-영역-data-layer)
   1. [데이터 소스 (Data Source)](#데이터-소스-data-source)
   2. [리포지토리 (Repository)](#리포지토리-repository)
      1. [데이터 유형당 하나의 리포지토리](#데이터-유형당-하나의-리포지토리)
      2. [데이터를 노출하고 이벤트를 수신](#데이터를-노출하고-이벤트를-수신)
      3. [정보 소스 (Source of Truth)](#정보-소스-source-of-truth)
      4. [불변성 (Immutablility)](#불변성-immutablility)
3. [UI Layer](#ui-layer)
   1. [UI Events](#ui-events)
4. [Domain Layer](#domain-layer)
5. [Organizing Modules](#organizing-modules)
6. [Entities](#entities)

###### 참고

- [Android Developers 채널](https://www.youtube.com/c/AndroidDevelopers)
- [Architecture 에피소드](https://goo.gle/Architecture)
- [App Architecture 가이드](https://developer.android.com/jetpack/guide)

## 소개 (Introduce)

성공적으로 앱을 개발하려면 우리는 건축가처럼 생각해야 합니다. 올바른 구조로 지어지지 않는 건물이 무너지는 것처럼 흔들리는 기반 위에서 개발된 앱은 충돌이 일어나거나 복잡한 유지 관리를 필요로 합니다. 다행히 Android를 기반으로 하는 앱을 성공적으로 구축하기 위한 가이드가 있습니다. 여기에서 진행하는 에피소드는 안정적이고 효과적으로 앱을 개발하기 위해 권장하는 **앱 아키텍처 가이드**를 설명합니다. 이 가이드는 기존의 `뷰 시스템(View, XML 등)` 또는 `Jetpack Compose` 등 모든 UI 프래임워크에 적용할 수 있습니다.

<!--
To build a successful app you should think like an architect. Just as a building will collapse without the right structure an app built on shaky foundations will crash or require complicated maintenance. Luckily there already assists a blueprint for success when building on android. In this series of videos We'll go through our recommended app architecture guidelines they will provide the foundations for a stable and effective app. Our guidelines apply whether you are working with a view system or jetpack compose. First we'll start with the interior structure the data layer. Then we'll move on to the front of the building where we will cover the ui layer and how to handle ui events. The domain layer simplifies interactions between the ui and data layers much like an elevator between floors. Finally we'll hang out together in a live qa session to answer all the questions you might have. And with all of this voila your app is ready to succeed. You can rest assured that you've built a foundation to create a high quality app. If i were you i couldn't miss this series. We'll be releasing episodes over the next few weeks so to be notified when a new episode comes out subscribe to the android developers youtube channel. See you around.
-->

![undraw_building_blocks]

## 데이터 영역 (Data Layer)

<!-- MAD Skills
With this episode of MAD skills we're starting a series of videos dedicated to architecture. We'll start from the ground up the data layer.
-->

아래 이미지는 데이터 영역이 맨 아래에 있는 앱 아키텍처를 설명하고 있습니다.

![mad_arch_data_overview]

데이터 영역에는 `애플리케이션 데이터` 및 `비즈니스 로직`이 포함됩니다. 비즈니스 로직은 앱에 가치를 부여하는 요소로, 애플리케이션의 데이터 생성, 저장, 변경 방식을 결정하는 실제 비즈니스 규칙으로 구성됩니다. 데이터 영역은 0개부터 여러 개의 데이터 소스를 각각 포함할 수 있는 저장소로 구성됩니다.

<!-- App Architecture - Data Layer
That is if you draw your app architecture with the data layer at the bottom. The data layer contains application data and business logic. The business logic is what gives value to your app it determines how application data must be created stored unchanged. The data layer is made of repositories that each can interact with zero one or more data sources.
-->

### 데이터 소스 (Data Source)

각 데이터 소스 클래스는 파일, 네트워크 소스, 로컬 데이터베이스와 같은 하나의 데이터 소스만 사용해야 합니다. 데이터 소스 클래스는 데이터 작업을 위해 애플리케이션과 시스템 간의 가교 역할을 합니다.

데이터 소스는 앱이 작동하기 위해 필요한 데이터를 네트워크, 로컬 데이터베이스, 파일, 메모리 등에서 제공하는 역할을 합니다. 그리고 데이터 소스는 게시글이나 유저, 영화와 같은 일반적으로 비즈니스 로직의 단위를 표현하는 하나의 데이터를 제공하는 경로로 작업해야만 합니다.

> 1. Remote**Articles**DataSource
> 1. Local**Users**DataSource
> 1. Remote**Movies**DataSource

<!-- App Architecture - Data Source
Data sources much like their name suggests are responsible for providing data the app needs to function. They may present data from the network a local database files or even from memory. And they should have the responsibility of working only with one source of data which typically holds a unit of business logic. for example articles users or movies. That's data sources.
-->

### 리포지토리 (Repository)

리포지토리는 데이터 영역이 다른 영역과 상호 작용하는 데 사용됩니다. 그리고 리포지토리는 앱의 나머지 영역에게 데이터를 제공할 뿐만 아니라 여러 데이터 소스 사이의 충돌을 방지하고 비즈니스 로직을 포함하는 데이터 변경 사항을 모두 책임져야 합니다.

> 1. 앱의 나머지 부분에 데이터 노출 (Expose data)
> 1. 데이터 변경사항을 한 곳에 집중 (Centralize changes)
> 1. 여러 데이터 소스 간의 충돌 해결 (Resolve confilcts)
> 1. 비즈니스 로직 포함 (Contain business logic)

<!--  App architecture - Repository
Now repository classes are used by all the layers in your app to interact with the data layer. They are responsible for exposing data to the rest of the app but also for centralizing changes the data resolving conflicts between multiple data sources and containing business logic.
-->

#### 데이터 유형당 하나의 리포지토리

앱에서 처리하는 서로 다른 데이터 유형을 위한 리포지토리를 만들어야 합니다. 예를 들어 동영상과 관련된 데이터를 위한 동영상 리포지토리, 또는 결제를 위한 결제 리포지토리를 만들어야 합니다. 리포지토리는 서로 다른 데이터 소스를 결합할 수 있으며, 서로 간의 잠재적인 충돌을 해결하는 역할을 합니다. 로컬 데이터베이스의 데이터와 원격 서버 사이에 충돌이 발생하는 경우 리포지토리에서 이를 찾아내고 수정해야 합니다.

```kotlin
class ExampleRepository(
    private val exampleRemoteDataSource: ExampleRemoteDataSource, // network
    private val exampleLocalDataSource: ExampleLocalDataSource // database
) { /* ... */ }
```

<!-- One Repository per Data Type
You should create a repository class for each different type of data you handle in your app. for example you might create a movies repository for data related to movies or a payments repository for payments. Repositories can combine different data sources and they're responsible for solving any potential conflicts between them. If there's a clash between the data in your local database and the server for example the repository should detect and fix this.
-->

#### 데이터를 노출하고 이벤트를 수신

앱의 모든 영역은 데이터 소스에 직접 데이터를 요청해서는 안 됩니다. 데이터 영역의 진입점은 항상 리포지토리여야 합니다. 리포지토리의 일반적인 기능은 읽기, 생성, 수정, 삭제와 같은 요청을 수행하는 것입니다. 이러한 기능은 Kotlin의 `suspend function`으로 구현할 수 있지만, Kotlin의 `Flow`를 사용하여 데이트 스트림을 노출함으로써 시간에 따른 데이터 변경 사항을 알릴 수도 있습니다. 리포지토리에서 여러 데이터 소스를 처리하는 것은 까다로울 수 있습니다. 정보 소스를 선택하고 항상 일관된 상태인지 확인해야 합니다.

```kotlin
class ExampleRepository(
    private val exampleRemoteDataSource: ExampleRemoteDataSource, // network
    private val exampleLocalDataSource: ExampleLocalDataSource, // database
) {

    val data: Flow<Example> = ...

    suspend fun modifyData(example: Example) { ... }
}
```

<!-- Exposing Data and Receiving Events
Remember that all the layers in your app should never depend on data sources directly. The entry points to the data layer are always the repository classes. A common pattern in repositories is to perform one-shot calls like create read update and delete. These can be implemented with suspend functions in kotlin but also you can be notified of data changes over time by exposing a data stream for example using kotlin's flow. This is out of the scope of this video so if you want to learn more check out our flow guide the link is in the description. Handling multiple data sources in a repository can get tricky. You need to choose a source of truth and make sure that it's always in a consistent state.
-->

#### 정보 소스 (Source of Truth)

<!-- Source of Truth
Let's look at a concrete example

let's say we have two sources of data for news.

Local news data source depends on a room database and can return a list of articles or update them.

Remote news data source depends on an api client for example a retrofit client.

This one can only fetch news.

Now the news repository would depend on those two data sources.

If we want to fetch the news from other layers we use the fetchnews method on the repository.

This method tries to load the news from the network first if it succeeds it updates the local database if it fails because there was no data connection or the server was down it just logs the error instead you might want to show something in the ui.

Finally in any case it returns the result from the database since it's our source of truth.

This case is very simple because we're using data that the user can't edit however resolving conflicts can get challenging for example imagine a calendar app where a meeting is modified by two users at the same time.

So this will require some thought because getting this right is important for a good offline first user experience.

Libraries that consume remote apis and remote databases such as file store have caching mechanisms that you can use and they can even deal with conflicts.

Now let's talk about immutability the data exposed by the data layer should be mutable so that all the classes cannot tamper with it this would risk putting its values into an inconsistent state.

Another advantage of immutable data is that it can be safely handled by multiple threads.
-->

#### 불변성 (Immutablility)

```kotlin
data class ArticleApiModel(
    val id: Long,
    val title: String,
    val content: String,
    val publicationDate: Date,
    val modifications: Array<ArticleApiModel>,
    val comments: Array<CommentApiModel>,
    val lastModificationDate: Date,
    val authorId: Long,
    val authorName: String,
    val authorDateOfBirth: Date,
    val readTimeMin: Int
)

data class Article(
    val id: Long,
    val title: String,
    val content: String,
    val publicationDate: Date,
    val authorName: String,
    val readTimeMin: Int
)
```

<!--Immutablility

kotlin's data classes are a perfect tool
for this
by the way when modeling entities you
should consider that the model returned
by your database or the remote api might
not be what the other layers need
for example in this article model if you
don't need the modifications or the
author's date of birth create a
different model for the ui layer
this not only makes your code neater it
provides better separation of concerns
letting each layer define what model it
needs.
-->

---

---

---

- threading

let's talk about threading now calling
data sources and repositories should be
main save
save to call from the main thread this
means that the repositories or data
sources are responsible for moving the
execution of their logic to the
appropriate thread when performing long
running or blocking operations

- errors

something
else to take into account are errors
because data operations won't always
succeed it's important to somehow
propagate information about a failure to
the other layers
one option is to simply let exceptions
propagate with suspend functions you can
wrap repository calls in a regular try
catch block from the ui or the domain
layer or if you're using flows you can
use the catch operator
another option is to catch these errors
in the data layer and expose data that
can contain either a success or a
failure with a more meaningful exception
in any case don't forget about dealing
with errors they will happen

- multiple levels of reoisitories

as you saw earlier a repository can
depend on multiple data sources in some
cases you might want to have multiple
levels of repositories this is perfectly
fine in this example a user repository
needs data from a login repository and
the registration repository similarly to
repositories can share a data source
all these tips are recommendations that
should work well in most apps however if
you have a reason to deviate feel free
to do it

- testing repositiries

finally let's talk about
testing the data layer is typically easy
to test repositories are unit tested
normally you replace the data sources
with fakes or mocks and verify that your
repository is correctly handling data
and calling the data sources we need it

- testing data sources

testing data sources can be slightly
tricky because they depend on databases
or api clients however the libraries
that let you do that usually provide
test artifacts or mechanisms for testing
for example room provides an in-memory
database implementation that can help
you test the code in the data source

- big tests

in end-to-end or big tests you test all
the layers of your app at the same time
but you might want to use fake data to
make your tests faster and more reliable
if you use dependency injection you
should be able to replace data sources
or repositories with fake
implementations you can also fake your
network calls with popular libraries
such as wiremock or mock web server
this video is a summary of the data
layer article in the architecture guide
for more details and code samples about
best practices in the data layer check
out the rest of the guide here
and that's it i hope you learned the
difference between a repository and a
data source and how to model the data
they expose
the next video we're releasing is about
the ui layer so subscribe if you want to
be notified when it's out or if you're
from the future check it out next
thanks

---

---

---

## UI Layer

### UI Events

## Domain Layer

## Organizing Modules

## Entities

<!-- ---------------------------- -->
<!-- ---------- define ---------- -->
<!-- ---------------------------- -->

<!-- undraw -->

[undraw_art_museum]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_art_museum.png?raw=true
[undraw_building_blocks]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_building_blocks.png?raw=true
[undraw_code_inspection]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_code_inspection.png?raw=true
[undraw_modern_design]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_modern_design.png?raw=true
[undraw_static_website]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_static_website.png?raw=true

<!-- modern android development -->

[mad_arch_data_overview]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/mad/mad_arch_data_overview.png?raw=true
