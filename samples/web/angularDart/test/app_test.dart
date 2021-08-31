@TestOn('browser')

import 'package:dbrjs_angulardart/app_component.dart';
import 'package:dbrjs_angulardart/app_component.template.dart' as ng;
import 'package:angular_test/angular_test.dart';
import 'package:test/test.dart';

void main() {
  final testBed =
      NgTestBed.forComponent<AppComponent>(ng.AppComponentNgFactory);
  NgTestFixture<AppComponent> fixture;

  setUp(() async {
    fixture = await testBed.create();
  });

  tearDown(disposeAnyRunningTest);

  test('Default greeting', () {
    expect(fixture.text, 'Welcome to DBRJS AngularDart sample');
  });
}
