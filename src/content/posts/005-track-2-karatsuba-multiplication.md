---
title: "[Algorithms Mixtape] track 2 - Karatsuba Multiplication"
date: 2020-06-24
---

The Karatsuba Multiplication algorithm was developed by Anatoly Karatsuba in
1960 and published in 1962. At the time, Andrey Kolmogorov had claimed that the
traditional grade-school algorithm was asymptotically optimal, and that any
multiplication algorithm would require Ω(_n_<sup>2</sup>) operations.

## Implementation

### Input

Two n-digit positive integers _x_, and _y_.

### Output

The product of _x_ and _y_.

### Description

1. If both operands are single digit numbers, compute and return the product
2. Split the first operand into two halves, `a` and `b`
3. Split the second operand into two halves, `c` and `d`
4. Recursively compute `a * c`
5. Recursively compute `b * d`
6. Recursively compute `(a + b) * (c + d)`
7. Subtract the results of step 4 and step 5 from step 6
8. Compute and return the final result by taking the sum of the results from
   steps 4, 5, and 7 after adding 10<super>n</super> trailing zeros to the
   result of step 4 and 10<super>n/2</super> zeros to the end of the result of
   step 7

### Code

```python
import math


def k_multiply(x, y):
    if x < 10 and y < 10:
        return x * y

    n = max(num_digits(x), num_digits(y))
    nby2 = n // 2

    a = x // 10**(nby2)
    b = x % 10**(nby2)
    c = y // 10**(nby2)
    d = y % 10**(nby2)

    ac = k_multiply(a, c)
    bd = k_multiply(b, d)
    ab_plus_bc = k_multiply(a+b, c+d) - ac - bd

    product = 10**(2*nby2) * ac + (10**nby2 * ab_plus_bc) + bd

    return product


def num_digits(num):
    if num == 0:
        return 1
    elif num <= 999999999999997:
        return int(math.log10(num)) + 1
    else:
        counter = 15
        while num >= 10**counter:
            counter += 1
        return counter
```

Note - The simplest implemenation of `num_digits` is to simply cast the number to
a string. For small numbers, using math.log10 is faster. However, if the number
is greater than 999999999999997, there will be inaccuracies due to the limits of
floating point precision.

Read the full source - [Algorithms Mixtape - Karatsuba Multiplication](https://github.com/julianmclain/algorithms-mixtape/tree/master/src/karatsuba_multiplication)

## Analysis

This one was tricky to implement for 2 reasons:

1. On first glance, the operations seem completely random. It was tough to
   develop an intuition for how the algorithm solves the problem.
2. It took me a while to figure out the best way to split the operands in
   half. I ended up left padding one operand with 0s if it has less digits than
   the other. Floor dividing each input by 10 to the power nby2 achieves this.

Does the additional complexity pay off? How much better is Karatsuba's algorithm
than straight-forward recursive multiplication?

Intuitively, we have to believe that the answer is yes. Karatsuba shaves a full
recursive call off the traditional algorithm.

### Asymptotic runtime

Let's compare standard recursive multiplication with Karatsuba multiplication.

#### Recursive multiplication

There are 4 recursive calls, in each recursive call the operands have half as many digits,
and outside the recusrive calls the additions and padding with
0s can be done in linear time.

The [Master
Method](<https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)>)
states that the runtine of a divide-and-conquer algorithm denoted _T(n)_ can be
expressed by the recurrence relation:

> _T_(_n_) <= _aT_(_n_/_b_) + _O_(_n_<sup>_d_</sup>)

Where _a_ is the number of recrusive calls, _b_ is the factor by which the input
size shrinks in every subproblem, and _d_ is the exponent in the running time of
the "combine" step.

For standard recursive multiplication, we fill in the following parameters:

- _a_ = 4
- _b_ = 2
- _d_ = 1

This puts the runtime in category 3 since _a_ > _b<sup>d</sup>_. Category 3 run
times are defined as _T_(_n_) = _O_(_n_<sup>log<sub>_b_</sub>_a_</sup>). Filling in the
parameters, we end up with a runtime of:

> _O_(_n_<sup>log<sub>2</sub>4</sup>) which simplifies to _O_(_n_<sup>2</sup>)

#### Karatsuba multiplication

The ingenuity of Karatsuba Multiplication is in the 6th step of the description.
The typical approach to recursive multiplication requires 4 recursive calls.
Karatsuba performs it with 3. Although the underlying idea was known to Gauss in
the 19th century, Karatsuba took advantage of the fact that the 2 recursive
calls computing `a * d` and `b * c`, can be condensed into one recursive call
computing `(a + b) * (c + d)`.

Again, using the Master Method, we fill in the following parameters:

- _a_ = 3
- _b_ = 2
- _d_ = 1

This also puts the runtime in category 3 since _a_ > _b<sup>d</sup>_. Category 3 run
times are defined as _T_(_n_) = _O_(_n_<sup>log<sub>_b_</sub>_a_</sup>). Filling in the
parameters, we end up with a runtime of:

> _O_(_n_<sup>log<sub>2</sub>3</sup>) or roughly _O_(_n_<sup>1.59</sup>)

A nice improvement for large input sizes!

Corrections are appreciated - if you see an error, please create a [Github issue](https://github.com/julianmclain/blog/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
