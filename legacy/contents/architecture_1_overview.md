# Clean Architecture in Android

## 1. Clean Architecture

우리의 프로젝트는 시간이 지날수록 사이즈가 커지게 됩니다.

그래서 우리는 여러가지 MVVM 등 디자인 패턴을 적용했습니다.

시간이 지날수록 프로젝트는 점점 더 테스트 및 기능 추가, 유지보수는 더욱더 힘들어지게 됩니다. 이유는 작업하는 사람이 많아져서, 프로젝트의 크기가 커져서 등등 다양합니다. 우리는 이렇게 프로젝트를 관리하는게 힘들어지는걸 방지하며 프로젝트를 진행해야 하는데

```

Android 앱은 크기가 커지기 때문에 앱을 확장하고 앱의 견고성을 높이며 앱을 더 쉽게 테스트할 수 있도록 아키텍처를 정의하는 것이 중요합니다.

앱 아키텍처는 앱의 부분과 그 각 부분에 필요한 기능 간의 경계를 정의합니다. 위에 언급된 요구사항을 충족하려면 몇 가지 특정 원칙을 준수하도록 앱 아키텍처를 설계해야 합니다.
```

### 1.1 관심사 분리

`Clean Archtecture`에서 가장 중요한 개념은 `관심사 분리`입니다.

안드로이드 앱을 처음 설계하고 개발할 때 Activity 또는 Fragment에 모든 코드를 넣어본 적이 있을 것입니다. 지금 생각해보면 Activity, Fragment 모두 UI 기반의 클래스이고 여기에 모든 코드를 넣고 작동을 시키고 다시 코드를 보고 유지보수 및 테스트를 할 때 굉장한 어려움을 느끼셨을 겁니다.

```
따라야 할 가장 중요한 원칙은 관심사 분리입니다. Activity 또는 Fragment에 모든 코드를 작성하는 실수는 흔히 일어납니다. 이러한 UI 기반의 클래스는 UI 및 운영체제 상호작용을 처리하는 로직만 포함해야 합니다. 이러한 클래스를 최대한 가볍게 유지하여 구성요소 수명 주기와 관련된 많은 문제를 피하고 그러한 클래스의 테스트 가능성을 개선할 수 있습니다.

Activity 및 Fragment 구현은 소유 대상이 아니며 Android OS와 앱 사이의 계약을 나타내도록 이어주는 클래스일 뿐입니다. OS는 사용자 상호작용을 기반으로 또는 메모리 부족과 같은 시스템 조건으로 인해 언제든지 클래스를 제거할 수 있습니다. 만족스러운 사용자 환경과 더욱 수월한 앱 관리 환경을 제공하려면 이러한 클래스에 대한 의존성을 최소화하는 것이 좋습니다.
```

### 1.2 데이터와 UI의 분리

Frontend 개발자들은 `Presentation Logic`과 `Businees Logic`의 사용이 필연적입니다.

> Businees Logic : 데이터적 요소
> Presentation Logic : UI적 요소

```
또 하나의 중요한 원칙은 데이터 모델에서 UI를 도출해야 한다는 것입니다. 가급적 지속적인 모델을 권장합니다. 데이터 모델은 앱의 데이터를 나타냅니다. 이들은 앱의 UI 요소 및 기타 구성요소와 독립되어 있습니다. 즉, 이들은 UI 및 앱 구성요소 수명 주기와는 관련이 없습니다. 하지만 OS에서 메모리에서 앱의 프로세스를 삭제하기로 결정하면 여전히 삭제됩니다.

지속 모델이 이상적인 이유는 다음과 같습니다.

Android OS에서 리소스를 확보하기 위해 앱을 제거해도 사용자 데이터가 삭제되지 않습니다.

네트워크 연결이 취약하거나 연결되어 있지 않아도 앱이 계속 작동합니다.

앱 아키텍처를 데이터 모델 클래스에 기반하는 경우 앱의 테스트 가능성과 견고성이 더 높아집니다.
```

---

## 2. Design Pattern

앞서 설명했던 `관심사 분리`, `의존성 제거`라는 개념을 도입하기위에 안드로이드 개발자들은 많은 노력을 했습니다. `관심사 분리`와 , `의존성 제거`의 필요성을 느끼고 Server분야, Web분야 등 다른 분야에서 사용하고 있던 프로그램 디자인 패턴을 도입하기 시작했습니다.

### 2.1 MVC (Model-View-Controller)

가장 단순하며 View와 Model 사이에 의존성이 있는 단점이 있는 디자인 패턴입니다.

안드로이드에서는 Activity, Fragment와 같은 컴포넌트가 있는데 이 2가지 클래스가 입력을 받는 Controller와 UI를 표시하는 View의 기능을 모두 처리하기 때문에 적절하지 않은 디자인 패턴이였습니다.

###### 이벤트 진행 순서

1. View는 Model로 부터 데이터를 받아 UI를 표시함
2. Controller가 사용자의 입력을 받음
3. Controller가 Model을 수정함
4. View가 UI를 표시함
   - View가 직접 Model을 읽음
   - Model이 View에게 수정 사항을 알림

### 2.1 MVP (Model-View-Presenter)

MVC 패턴을 기반으로 제안된 디자인 패턴입니다. MVC 패턴에서 문제점이였던 View와 Model의 의존성을 제거하였습니다.

Presenter는 View와 Model를 가지고 있으며 View와 1:1 매칭이 됩니다. 프로젝트가 커질수록 Presenter가 거대해졌고 View와 Model사이에 의존성을 사라졌지만 Presenter와 View사이의 의존성은 강해졌습니다.

###### 이벤트 진행 순서

1. Presenter는 Model로 부터 데이터를 받음
2. View는 Presenter로 부터 데이터를 받아 UI를 표시함
3. View가 사용자의 입력을 받음
4. View는 Presenter에게 입력을 알림
5. Presenter는 Model을 수정함
6. Presenter는 View에게 수정한 데이터를 알림
7. View는 Presenter에게 받은 데이터로 UI를 표시함

### 2.2 MVVM (Model-View-ViewModel)

MVP 패턴과 마찬가지로 MVC 패턴을 기반으로 제안된 디자인 패턴입니다. View와 Model사이의 의존성 뿐만 아니라 View와 Controller사이의 의존성도 고려하여 설계된 디자인 패턴입니다.

ViewModel은 데이터를 가지고 로직을 구현하며 View는 필요한 로직을 구현한 ViewModel을 사용합니다. MVP 패턴의 Presenter은 UI관련 로직을 구현하지만 ViewModel은 UI 한 부분의 로직을 구현합니다. 동일한 로직을 가지고 있는 다른 View라도 해당 로직을 사용할 때는 해당 로직을 구현한 ViewModel을 사용합니다. 즉, View와 ViewModel은 1:N의 관계가 있고 코드의 중복이 제거될 수 있습니다.

이 시기부터 안드로이드 진영인 구글에서도 앱 품질에 신경을 쓰기 시작했습니다. 그래서 구글은 MVVM 패턴을 쉽게 구현해주는 안드로이드 전용 라이브러리인 [AAC(Android Architecture Components)](https://developer.android.com/topic/libraries/architecture)를 개발하고 배포합니다. 예로 현재 많이 사용하고 있는 [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel), [LiveData](https://developer.android.com/topic/libraries/architecture/livedata) 클래스가 있습니다.

###### 이벤트 진행 순서

1. ViewModel은 Model로 부터 데이터를 받음
2. View는 필요한 데이터를 가진 ViewModel을 선택해 UI를 표시함
3. View가 사용자의 입력을 받음
4. View는 입력에 맞는 ViewModel에게 입력을 알림
5. ViewModel을 Model을 수정함
6. View는 ViewModel의 데이터를 받고 UI를 표시함

### 2.3 MVI (Model-View-Intent)

Javascript 진영에 Reactive(RX) Programming라는 개념이 생겨나게 되었습니다. 그 이후로 많은 프로그래밍 언어들이 이 패러다임에 동참하게 되고 RX를 공식적으로 지원하기 시작합니다. 그 때 쯤 안드로이드 개발 언어인 Java도 RxJava가 생겨났습니다. 그리고 이 시기에 Kotlin 이라는 새로운 언어가 안드로이드 진영에 도입됩니다. 이로 인해서 안드로이드 진영에 완벽한 RX가 도입이 되었고 그로 인해서 디자인 패턴에도 RX라는 개념이 도입되기 시작합니다.

MVI 패턴은 `Intent -> Model -> View`라는 단방향 흐름(Uni Directional Flow)으로 이루어져 있습니다. 그리고 이 흐름에는 절대 변하지 않는 데이터가 전달됩니다. 이 단방향 흐름과 불변한 데이터의 전달은 안드로이드 앱을 개발할 때 수많은 상황(Networking, Lifecycle, 화면 회전 등)에서 예측 가능하고 일관성있는 상태를 유지할 수 있습니다.

> 여기서 MVI 패턴의 Intent는 안드로이드의 Activity 사이에 데이터를 전달하는 Intent와 다른 개념으로, Reactive적인 요소입니다.

###### 이벤트 진행 순서

1. Intent는 사용자의 입력을 관찰합니다.
2. Model은 Intent의 사용자 입력을 관찰하고 입력에 따른 데이터 변경을합니다.
3. View는 Model의 데이터 변화를 관찰하고 변화에 따른 UI를 표시합니다.

---

## 3. App Architecture

```
이 섹션에서는 다음의 권장사항에 따라 앱을 구조화하는 방법을 보여줍니다.

참고: 이 페이지의 추천 사항과 권장사항은 광범위한 앱에 적용되며, 이를 기반으로 앱을 확장하고, 품질 및 견고성을 개선하고, 더욱 손쉽게 테스트할 수 있습니다. 도움말은 가이드라인으로 간주하고 필요에 따라 요건에 맞게 조정해야 합니다.
이전 섹션에서 언급된 일반적인 아키텍처 원칙을 고려하여 각 애플리케이션에는 레이어가 두 개 이상 있어야 합니다.

화면에 애플리케이션 데이터를 표시하는 UI 레이어
앱의 비즈니스 로직을 포함하고 애플리케이션 데이터를 노출하는 데이터 레이어
UI와 데이터 레이어 간의 상호작용을 간소화하고 재사용하기 위한 도메인 레이어라는 레이어를 추가할 수 있습니다.

일반적인 앱 아키텍처에서 UI 레이어는 애플리케이션 데이터를 데이터 레이어에서 가져오거나 UI 레이어와 데이터 레이어 사이에 있는 선택적 도메인 레이어에서 가져옵니다.
그림 1. 일반적인 앱 아키텍처 다이어그램
```

### 2.1. UI Layer

#### 2.1-2. UI events

#### 2.2. Domain Layer (Optional)

#### 2.3. Data Layer

---

###### 참고 사이트

- [Guide to app architecture](https://developer.android.com/jetpack/guide)
- [UI layer](https://developer.android.com/jetpack/guide/ui-layer)
- [UI events](https://developer.android.com/jetpack/guide/ui-layer/events)
- [Domain layer](https://developer.android.com/jetpack/guide/domain-layer)
- [Data layer](https://developer.android.com/jetpack/guide/data-layer)

## 관심사 분리

`Clean Architecture`에서 중요시 되는 개념은 `관심사 분리`입니다. 이 `관심사 분리`라는 개념은 앱이 확장되고 커질수록 견고하게, 더 쉽게 테스트할 수 있게 됩니다.

## Separation of Layer

### 1. UI Layer

#### 1-2. UI events

#### 2. Domain Layer (Optional)

#### 3. Data Layer
