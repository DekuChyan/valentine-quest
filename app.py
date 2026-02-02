"""
Valentine's Day Interactive Quest
A romantic web application built with Flask
"""

from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import os
from config import config

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__,
            template_folder=os.path.join(basedir, 'templates'),
            static_folder=os.path.join(basedir, 'static'))

app.config.from_object(config[os.environ.get('FLASK_ENV', 'default')])


@app.route('/')
def index():
    """Головна сторінка - початок квесту"""
    session.clear()
    session['progress'] = 0
    return render_template('index.html')


@app.route('/story/<int:story_num>')
def story(story_num):
    """Сторінки історії/квесту"""
    if story_num < 1 or story_num > 5:
        return redirect(url_for('index'))

    session['progress'] = story_num

    # Створюємо назву файлу окремо
    template_name = f'story_{story_num}.html'

    return render_template(
        template_name,
        story_number=story_num,
        progress=session.get('progress', 0)
    )


@app.route('/answer', methods=['POST'])
def answer():
    # 1. Отримуємо дані, які прислав JavaScript
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Дані не отримано'}), 400

    choice = data.get('choice')  # Наприклад 'A', 'B' або 'C'
    # Перетворюємо в число, бо з JS може прийти рядок "1"
    try:
        current_story = int(data.get('current_story'))
    except (ValueError, TypeError):
        current_story = 1


    # Історія 1 -> йдемо на Історію 2
    if current_story == 1:
        # Тут можна перевірити правильність:
        # if choice == 'B': ...нарахувати бали...

        # Кажемо JS: "Переходь на другу історію"
        return jsonify({'next_url': url_for('story', story_num=2)})

    # Історія 2 -> йдемо на Історію 3
    elif current_story == 2:
        return jsonify({'next_url': url_for('story', story_num=3)})

    # Історія 3 -> йдемо на Історію 4
    elif current_story == 3:
        return jsonify({'next_url': url_for('story', story_num=4)})

    # Історія 4 -> йдемо на Історію 5
    elif current_story == 4:
        return jsonify({'next_url': url_for('story', story_num=5)})

    # Історія 5 -> йдемо на Фінал
    elif current_story == 5:
        return jsonify({'next_url': url_for('finale')})  # Переконайся, що є роут 'finale'

    # Якщо номер історії невідомий
    return jsonify({'next_url': url_for('index')})


@app.route('/finale')
def finale():
    """Фінальна сторінка з головним сюрпризом"""
    if session.get('progress', 0) < 5:
        return redirect(url_for('index'))

    return render_template('finale.html')


@app.route('/final-answer', methods=['POST'])
def final_answer():
    """Обробка фінальної відповіді"""
    data = request.get_json()
    handle_answer = data.get('answer', False)
    session['final_answer'] = handle_answer
    return {'success': True, 'answer': handle_answer}

@app.errorhandler(404)
def not_found(_e):
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_error(_e):
    return render_template('index.html'), 500


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
