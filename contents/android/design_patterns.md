# Design Patterns in Android

우리는 항상 적은 코드와 잘 작동하는 프로그램을 기대하면서 코드를 작성합니다. 하지만 실제 프로젝트가 진행되면서 많은 부분에서 버그가 생겨 고치고 진행하는 도중에 여러 가지 추가기능이 생기면서 코드는 점점 꼬여가고 복잡해져 갑니다. 그래도 내가 고민하고 작성한 코드라면 이해할 수는 있지만 만약에 퇴사한 전임자가 자신만의 패턴으로 작성한 코드를 보면 작은 한숨과 함께 새로이 코드를 작성하고 싶어 합니다.

수많은 선배 개발자들이 앞서 이러한 시행착오를 거치고 발전해 나아가면서 몇 가지 프로그램 구조를 생각하게 됩니다. 이러한 프로그램 구조는 여러 가지 방식으로 불리지만 `디자인 패턴`이라 불리기도 합니다.

![undraw_art_museum]

## 1. 디자인 패턴의 목표

이 `디자인 패턴`들은 주로 `관심사 분리`, `의존성 제거`라는 개념을 지키기 위해 발전되었습니다. 프로그램을 작성할 때 `관심사 분리`를 지키게 되면 클래스는 적은 기능으로 가벼워지고 관리가 간단해집니다. `의존성 제거`를 지키게 되면 한 클래스를 수정하더라고 다른 클래스에 영향을 덜 주게 됩니다.

우리는 프론트엔드 개발자로서 주로 `Business Logic`과 `Presentation Logic`을 구현합니다. `Business Logic`은 **Model, Data Layer**라고도 불리며 데이터를 주로 가공하는 기능을 구현합니다. `Presentation Logic`은 **View, UI Layer**라고 불리며 사용자에게 표시하는 화면을 구현합니다.

> **Business Logic** : 데이터적 요소를 구현하는 로직
> ex) Model, Data Layer

> **Presentation Logic** : GUI적 요소를 구현하는 로직
> ex) View, UI Layer

![the_clean_architecture]

### 1.1 관심사 분리

`관심사 분리`는 한 클래스는 한 가지 기능을 구현해야 한다는 원칙입니다.

이 원칙을 지키게 되면 클래스가 거대해지는 걸 방지할 수 있습니다. 클래스가 거대해지면 그만큼 유지보수가 힘들어지고 기능추가가 어렵게 된다는 단점이 있습니다. 그래서 클래스의 관심사를 분리해서 거대한 클래스를 여러 개의 클래스로 분리하고 클래스는 한가지 기능만을 제공하게 해야 합니다.

아래 소개되는 디자인 패턴들의 이름은 **MV(Model-View)** 로 시작합니다. 이는 `Business Logic`과 `Presentation Logic`의 관심사를 분리해서 각각 **Model** 계층과 **View** 계층으로 분리해 `관심사 분리`라는 원칙을 지키게 됩니다.

### 1.2 의존성 제거

`의존성 제거`는 한 클래스의 수정이 발생해도 다른 클래스에 영향이 가지 않게 한다는 원칙입니다.

이 원칙을 지키지 않고 코드를 작성하게 되면 한 클래스의 수정이 다른 클래스에 영향을 받아 의도하지 않은 버그가 발생할 수 있게 됩니다. 또한 테스트 코드를 작성하는데 다른 클래스에 영향을 받아 제대로 테스트가 이루어지는지 예측할 수 없게 됩니다. 이 원칙을 지키게 되면 클래스의 수정이 자유롭고 테스트 코드를 작성하기 쉽게 해줍니다.

프로그램을 작성하다 보면 단일 클래스로 작성할 수 없다 보니 클래스 서로 간에 의존성이 생길 수밖에 없습니다. 아래 소개되는 디자인 패턴들은 이 `의존성 제거`를 어떠한 방식으로 해소를 해야 하는지에 대한 고민과 철학이 담겨 정립되게 됩니다.

## 2. 디자인 패턴의 종류

디자인 패턴은 `Business Logic`과 `Presentation Logic` 계층 사이의 `의존성 제거`, 각 계층의 `관심사 분리`를 위해 발전하게 됩니다. 뒤이어 이어지는 설명의 용어에서 `Business Logic`은 **Model**, `Presentation Logic`은 **View**로 표기가 됩니다.

### 2.1 MVC (Model-View-Controller)

가장 단순하며 Model과 View 사이에 의존성이 있는 단점이 있는 디자인 패턴입니다.

Controller는 사용자의 입력을 받고 그 입력을 필요에 따라 View 또는 Model로 전달해줍니다. Model이 수정되어서 View가 수정될 가능성이 있는 경우 Model이 직접 View에 전달합니다.

안드로이드에서는 Activity, Fragment와 같은 컴포넌트가 있는데 이 2가지 클래스가 입력받는 Controller와 UI를 표시하는 View의 기능을 모두 처리하기 때문에 적절하지 않은 디자인 패턴이었습니다.

| MVC Pattern            |
| ---------------------- |
| ![design_patterns_mvc] |

###### 이벤트 진행 순서

1. View는 Model로 부터 데이터를 받아 UI를 표시함
2. Controller가 사용자의 입력을 받음
3. Controller가 Model을 수정함
4. View가 UI를 표시함
   - View가 직접 Model을 읽음
   - Model이 View에게 수정 사항을 알림

### 2.2 MVP (Model-View-Presenter)

MVC 패턴을 기반으로 제안된 디자인 패턴입니다. MVC 패턴에서 문제점이었던 View와 Model의 의존성을 제거하였습니다.

Presenter는 Model과 View를 이어주는 브릿지 역활을 합니다. 사용자의 입력은 View가 받고 Presenter에 전달하며 Presenter는 Model에 전달합니다. Model은 View가 수정될 가능성이 있는 경우 Presenter에 전달하고 다시 Presenter가 View에 전달합니다.

Presenter는 View와 Model을 가지고 있으며 View와 1:1 매칭이 됩니다. 프로젝트가 커질수록 Presenter가 거대해졌고 View와 Model 사이에 의존성을 사라졌지만, Presenter와 View 사이의 의존성은 강해졌습니다.

| MVP Pattern            |
| ---------------------- |
| ![design_patterns_mvp] |

###### 이벤트 진행 순서

1. Presenter는 Model로 부터 데이터를 받음
2. View는 Presenter로 부터 데이터를 받아 UI를 표시함
3. View가 사용자의 입력을 받음
4. View는 Presenter에게 입력을 알림
5. Presenter는 Model을 수정함
6. Presenter는 View에게 수정한 데이터를 알림
7. View는 Presenter에게 받은 데이터로 UI를 표시함

### 2.3 MVVM (Model-View-ViewModel)

MVP 패턴과 마찬가지로 MVC 패턴을 기반으로 제안된 디자인 패턴입니다. View와 Model 사이의 의존성뿐만 아니라 View와 Controller 사이의 의존성도 고려하여 설계된 디자인 패턴입니다.

ViewModel은 경량화된 Presenter라고 생각하시면 됩니다. 사용자의 입력은 View가 받고 해당하는 기능을 가진 ViewModel을 선택해서 전달합니다. ViewModel은 필요에 따라 Model을 수정합니다. View가 수정될 필요가 있는 경우 ViewModel의 값을 View가 가져와서 수정합니다.

MVP 패턴과 다르게 ViewModel은 Model을 가지고 있지만 View는 가지고 있지 않습니다. ViewModel은 UI의 한 기능을 구현합니다. 그러므로 한 View에 여러 가지 ViewModel이 있을 수 있는 1:N 매칭이 됩니다. 이로 따라서 View와 ViewModel 사이의 의존성이 제거되었고 코드 중복이 줄어들게 되었습니다.

이 시기부터 안드로이드 진영인 구글에서도 앱 품질에 신경을 쓰기 시작했습니다. 그래서 구글은 MVVM 패턴을 쉽게 구현해주는 안드로이드 전용 라이브러리인 [AAC(Android Architecture Components)](https://developer.android.com/topic/libraries/architecture)를 개발하고 배포합니다. 예로 현재 많이 사용하고 있는 [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel), [LiveData](https://developer.android.com/topic/libraries/architecture/livedata) 클래스가 있습니다.

| MVVM Pattern            |
| ----------------------- |
| ![design_patterns_mvvm] |

###### 이벤트 진행 순서

1. ViewModel은 Model로 부터 데이터를 받음
2. View는 필요한 데이터를 가진 ViewModel을 선택해 UI를 표시함
3. View가 사용자의 입력을 받음
4. View는 입력에 맞는 ViewModel에게 입력을 알림
5. ViewModel을 Model을 수정함
6. View는 ViewModel의 데이터를 받고 UI를 표시함

### 2.4 MVI (Model-View-Intent)

Javascript 진영에 Reactive(RX) Programming이라는 개념이 생겨났습니다. 그 이후로 많은 프로그래밍 언어들이 이 패러다임에 동참하게 되고 RX를 공식적으로 지원하기 시작합니다. 그때쯤 안드로이드 개발 언어인 Java도 RxJava가 생겨났습니다. 그리고 이 시기에 Kotlin이라는 새로운 언어가 안드로이드 진영에 도입됩니다. 이에 따라서 안드로이드 진영에 완벽한 RX가 도입되었고 그로 인해서 디자인 패턴에도 RX라는 개념이 도입되기 시작합니다.

MVI 패턴은 `Intent -> Model -> View`라는 단방향 흐름(Uni Directional Flow)으로 이루어져 있습니다. 그리고 이 흐름 사이에는 절대 변하지 않는 데이터(Immutable)가 전달됩니다. 이 단방향 흐름과 불변한 데이터의 전달은 안드로이드 앱을 개발할 때 수많은 상황(Networking, Lifecycle, 화면 회전 등)에서 예측할 수 있고 일관성 있는 상태를 유지할 수 있습니다.

> 여기서 MVI 패턴의 Intent는 안드로이드의 Activity 사이에 데이터를 전달하는 Intent와 다른 개념으로, Reactive 적인 요소입니다.

| MVI Pattern            |
| ---------------------- |
| ![design_patterns_mvi] |

###### 이벤트 진행 순서

1. Intent는 사용자의 입력을 관찰합니다.
2. Model은 Intent의 사용자 입력을 관찰하고 입력에 따른 데이터 변경을합니다.
3. View는 Model의 데이터 변화를 관찰하고 변화에 따른 UI를 표시합니다.

## 3. 결론

현재 Android 진영에서는 `MVVM 패턴`과 `MVI 패턴`을 많이 사용합니다. `MVVM 패턴`은 구글에서 직접 지원하고 있는 디자인 패턴이고 레퍼런스가 매우 많으며 `MVI 패턴`은 Kotlin이라는 언어와 잘 맞고 현대적인 프로그래밍 기법과 어울립니다.

지금 설명한 디자인 패턴은 각각 장단점이 있고, 서로 상호 보완적입니다. 그래서 반드시 최신의 디자인 패턴을 사용하는 것이 아니라 내가 사용하는 언어, 프래임워크, 라이브러리에 맞는 혹은 내 프로젝트의 성격과 맞는 디자인 패턴을 사용해야 합니다.

<!-- ---------------------------- -->
<!-- ---------- define ---------- -->
<!-- ---------------------------- -->

<!-- undraw -->

[undraw_art_museum]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/undraw_art_museum.png?raw=true

<!-- disign patterns -->

[design_patterns_mvc]: https://github.com/yelloze-xyz/tech-blog/blob/main/assets/images/design_patterns_mvc.jpg?raw=true
[design_patterns_mvi]: https://github.com/yelloze-xyz/tech-blog/blob/main/assets/images/design_patterns_mvi.jpg?raw=true
[design_patterns_mvp]: https://github.com/yelloze-xyz/tech-blog/blob/main/assets/images/design_patterns_mvp.jpg?raw=true
[design_patterns_mvvm]: https://github.com/yelloze-xyz/tech-blog/blob/main/assets/images/design_patterns_mvvm.jpg?raw=true

<!-- etc -->

[the_clean_architecture]: https://github.com/yelloze-xyz/tech-blog/blob/main/assets/images/the_clean_architecture.jpeg?raw=true
