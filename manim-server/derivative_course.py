from manim import *

class Step1(Scene):
    def construct(self):
        title = Text("Step 1: See the Change", font_size=32, color=YELLOW)
        title.to_edge(UP)
        self.play(Write(title))

        axes = Axes(x_range=[-3, 3, 1], y_range=[0, 9, 2], x_length=8, y_length=5,
            axis_config={"include_numbers": True, "font_size": 20}).shift(DOWN * 0.3)
        labels = axes.get_axis_labels(x_label="x", y_label="f(x)")
        graph = axes.plot(lambda x: x**2, color=BLUE, x_range=[-2.8, 2.8])
        graph_label = MathTex("f(x) = x^2", color=BLUE, font_size=28).next_to(axes, RIGHT).shift(UP)

        self.play(Create(axes), Write(labels))
        self.play(Create(graph), Write(graph_label))

        tracker = ValueTracker(-2.5)
        dot = always_redraw(lambda: Dot(axes.c2p(tracker.get_value(), tracker.get_value()**2), color=RED, radius=0.12))
        question = Text("How fast is it changing right now?", font_size=22, color=WHITE).to_edge(DOWN)

        self.play(FadeIn(dot))
        self.play(tracker.animate.set_value(2.5), run_time=5, rate_func=linear)
        self.play(Write(question))
        self.wait(2)


class Step2(Scene):
    def construct(self):
        title = Text("Step 2: Average Rate of Change", font_size=32, color=YELLOW)
        title.to_edge(UP)
        self.play(Write(title))

        axes = Axes(x_range=[-3, 3, 1], y_range=[0, 9, 2], x_length=8, y_length=5,
            axis_config={"include_numbers": True, "font_size": 20}).shift(DOWN * 0.3)
        graph = axes.plot(lambda x: x**2, color=BLUE, x_range=[-2.8, 2.8])
        self.play(Create(axes), Create(graph))

        x1, x2 = -1, 2
        p1, p2 = axes.c2p(x1, x1**2), axes.c2p(x2, x2**2)
        dot1, dot2 = Dot(p1, color=RED, radius=0.1), Dot(p2, color=RED, radius=0.1)
        label1 = Text(f"({x1}, {x1**2})", font_size=16, color=RED).next_to(dot1, DL, buff=0.15)
        label2 = Text(f"({x2}, {x2**2})", font_size=16, color=RED).next_to(dot2, UR, buff=0.15)
        secant = Line(p1, p2, color=YELLOW, stroke_width=3)
        secant_label = Text("Secant = Average Rate", font_size=20, color=YELLOW).next_to(secant, UP, buff=0.3)
        slope_val = (x2**2 - x1**2) / (x2 - x1)
        slope_text = Text(f"Slope = {slope_val:.0f}", font_size=22, color=YELLOW).to_edge(DOWN)

        self.play(FadeIn(dot1), FadeIn(dot2), Write(label1), Write(label2))
        self.play(Create(secant), Write(secant_label))
        self.play(Write(slope_text))
        self.wait(2)


class Step3(Scene):
    def construct(self):
        title = Text("Step 3: The Result is Unstable", font_size=32, color=YELLOW)
        title.to_edge(UP)
        self.play(Write(title))

        axes = Axes(x_range=[-3, 3, 1], y_range=[0, 9, 2], x_length=8, y_length=5,
            axis_config={"include_numbers": True, "font_size": 20}).shift(DOWN * 0.3)
        graph = axes.plot(lambda x: x**2, color=BLUE, x_range=[-2.8, 2.8])
        self.add(axes, graph)

        x1 = 1
        tracker = ValueTracker(2.5)
        dot1 = Dot(axes.c2p(x1, x1**2), color=RED, radius=0.1)
        dot2 = always_redraw(lambda: Dot(axes.c2p(tracker.get_value(), tracker.get_value()**2), color=GREEN, radius=0.1))
        secant = always_redraw(lambda: Line(axes.c2p(x1, x1**2), axes.c2p(tracker.get_value(), tracker.get_value()**2), color=YELLOW, stroke_width=3))
        slope_text = always_redraw(lambda: Text(
            f"Slope = {((tracker.get_value()**2 - x1**2) / (tracker.get_value() - x1 + 0.001)):.2f}",
            font_size=20, color=YELLOW).to_edge(DOWN))
        hint = Text("Different point = Different slope", font_size=20, color=WHITE).to_corner(DR)

        self.play(FadeIn(dot1), FadeIn(dot2), Create(secant))
        self.add(slope_text)
        self.play(tracker.animate.set_value(-1), run_time=3)
        self.play(tracker.animate.set_value(2), run_time=2)
        self.play(tracker.animate.set_value(0.5), run_time=2)
        self.play(Write(hint))
        self.wait(2)


class Step4(Scene):
    def construct(self):
        title = Text("Step 4: Getting Closer = Tangent Line", font_size=30, color=YELLOW)
        title.to_edge(UP)
        self.play(Write(title))

        axes = Axes(x_range=[-1, 4, 1], y_range=[0, 9, 2], x_length=8, y_length=5,
            axis_config={"include_numbers": True, "font_size": 20}).shift(DOWN * 0.3)
        graph = axes.plot(lambda x: x**2, color=BLUE, x_range=[-0.5, 3])
        self.add(axes, graph)

        x0 = 1
        dx = ValueTracker(1.5)
        dot1 = Dot(axes.c2p(x0, x0**2), color=RED, radius=0.1)
        dot2 = always_redraw(lambda: Dot(axes.c2p(x0 + dx.get_value(), (x0 + dx.get_value())**2), color=GREEN, radius=0.1))
        secant = always_redraw(lambda: Line(
            axes.c2p(x0 - 0.5, x0**2 - 0.5 * ((x0 + dx.get_value())**2 - x0**2) / (dx.get_value() + 0.001)),
            axes.c2p(x0 + dx.get_value() + 0.5, (x0 + dx.get_value())**2 + 0.5 * ((x0 + dx.get_value())**2 - x0**2) / (dx.get_value() + 0.001)),
            color=YELLOW, stroke_width=3))
        dx_label = always_redraw(lambda: MathTex(f"\\Delta x = {dx.get_value():.2f}", font_size=28, color=GREEN).to_edge(DOWN))

        self.play(FadeIn(dot1), FadeIn(dot2), Create(secant))
        self.add(dx_label)
        self.play(dx.animate.set_value(0.8), run_time=2)
        self.play(dx.animate.set_value(0.3), run_time=2)
        self.play(dx.animate.set_value(0.1), run_time=2)
        self.play(dx.animate.set_value(0.02), run_time=2)

        final_text = Text("Secant -> Tangent!", font_size=26, color=YELLOW).to_corner(DR)
        self.play(Write(final_text))
        self.wait(2)


class Step5(Scene):
    def construct(self):
        title = Text("Step 5: Derivative = Slope of Tangent", font_size=30, color=YELLOW)
        title.to_edge(UP)
        self.play(Write(title))

        axes = Axes(x_range=[-3, 3, 1], y_range=[0, 9, 2], x_length=8, y_length=5,
            axis_config={"include_numbers": True, "font_size": 20}).shift(DOWN * 0.3)
        labels = axes.get_axis_labels(x_label="x", y_label="f(x)")
        graph = axes.plot(lambda x: x**2, color=BLUE, x_range=[-2.8, 2.8])
        graph_label = MathTex("f(x) = x^2", color=BLUE, font_size=24).next_to(axes, RIGHT).shift(UP * 0.5)
        self.play(Create(axes), Write(labels), Create(graph), Write(graph_label))

        tracker = ValueTracker(-2)
        dot = always_redraw(lambda: Dot(axes.c2p(tracker.get_value(), tracker.get_value()**2), color=RED, radius=0.12))
        tangent = always_redraw(lambda: axes.get_secant_slope_group(x=tracker.get_value(), graph=graph, dx=0.01, secant_line_length=4, secant_line_color=YELLOW))
        slope_label = always_redraw(lambda: MathTex(f"f'(x) = 2x = {2 * tracker.get_value():.1f}", font_size=28, color=YELLOW).to_edge(DOWN))
        deriv_formula = MathTex("f'(x) = 2x", font_size=36, color=YELLOW).to_corner(UR)

        self.play(FadeIn(dot), Create(tangent))
        self.add(slope_label)
        self.play(Write(deriv_formula))
        self.play(tracker.animate.set_value(2), run_time=6, rate_func=linear)

        final = Text("Derivative = Speed of change at this moment", font_size=22, color=WHITE)
        final.to_edge(DOWN).shift(DOWN * 0.3)
        self.play(Write(final))
        self.wait(2)
